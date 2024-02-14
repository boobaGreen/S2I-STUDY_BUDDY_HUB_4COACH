//authController.js
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmailProd = require('../utils/sendEmailProd');
const sendEmailDev = require('../utils/sendEmailDev');
// const GoogleUser = require('../models/userGoogleModel');

const BACK_PATH = process.env.BACK_SITE_WEB;
let FRONT_PATH = '';

if (process.env.NODE_ENV === 'development') {
  FRONT_PATH = process.env.FRONT_SITE_LOCAL;
} else {
  FRONT_PATH = process.env.FRONT_SITE_WEB;
}
console.log('FRONT_PATH', FRONT_PATH);
console.log('BACK_PATH', BACK_PATH);
// Oauth Google function
async function getUserData(accessToken) {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`,
  );

  const data = await response.json();

  return data;
}

// CreateActiveAccountToken Function
const createActiveAccountToken = function () {
  const activeToken = crypto.randomBytes(32).toString('hex');

  this.activeAccountToken = crypto
    .createHash('sha256')
    .update(activeToken)
    .digest('hex');

  // this.activeAccountExpires = Date.now() + 10 * 60 * 1000; // 10 min

  return activeToken;
};
// Sign Token Function
const signToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Create and send token function
// Modifica la firma della funzione per includere un parametro opzionale per la risposta (res) e per la richiesta (req)
const createSendToken = (user, statusCode, res, isGoogleAuth = false) => {
  // Crea il token JWT
  const token = signToken(user._id);

  // Opzioni del cookie
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    // modifiche aggiunte temporanee x testare google auth da rivedere soprattuto deve prod
    domain: 'localhost',
    sameSite: 'none', // Aggiungi questa riga
    // fine modifiche relative a google auth
  };

  if (process.env.NODE_ENV === 'production') {
    cookieOptions.secure = true;
  }

  // Imposta il cookie JWT
  res.cookie('jwt', token, cookieOptions);

  // Se è un'operazione di autenticazione Google, reindirizza l'utente
  if (isGoogleAuth) {
    res.redirect(303, `${BACK_PATH}/googleOauth?token=${token}`);
    return; // Termina l'esecuzione per evitare ulteriori invii di risposta
  }

  // Rimuovi la password dalla risposta
  if (user.password) {
    user.password = undefined;
  }

  // Invia la risposta al frontend
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// CONFIRM ACCOUNT FUNCTION
const confirmAccount = (Model) =>
  catchAsync(async (req, res, next) => {
    const { activeToken } = req.params;

    const filter = {
      activeToken: activeToken,
    };

    const update = { status: 'Active', activeToken: null };
    // if (doc.status === 'Active') {
    //   return next(new AppError('The account is already active', 404));
    // }
    const doc = await Model.findOneAndUpdate(filter, update, {
      new: true,
    });

    if (!doc) {
      return next(
        new AppError(
          'the link is incorrect or the account has already been activated',
          404,
        ),
      );
    }

    createSendToken(doc, 200, res);
  });
exports.requestUrlOgoogle = catchAsync(async (req, res, next) => {
  res.header('Access-Control-Allow-Origin', `${FRONT_PATH}`);
  res.header('Referrer-Policy', 'no-referrer-when-downgrade');
  const redirectUrl = `${FRONT_PATH}/api/v1/users/oauthGoogle`;
  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl,
  );
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope:
      'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
    prompt: 'consent',
  });
  res.json({ url: authorizeUrl });
});

/* GET home page. */
exports.oauthGoogle = catchAsync(async (req, res, next) => {
  const { code } = req.query;

  let googleUser;
  try {
    const redirectURL = `${FRONT_PATH}/api/v1/users/oauthGoogle`;
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectURL,
    );
    const r = await oAuth2Client.getToken(code);

    await oAuth2Client.setCredentials(r.tokens);

    googleUser = await getUserData(oAuth2Client.credentials.access_token);
    const userFind = await User.findOne({ email: googleUser.email });

    let customGoogleUser = {};

    const googlePassword = googleUser.sub.toString();

    if (!userFind) {
      customGoogleUser = await User.create({
        googleId: googleUser.sub,
        userName: googleUser.given_name,
        photo: googleUser.picture,
        email: googleUser.email,
        password: googlePassword,
        passwordConfirm: googlePassword,
        role: 'user',
        status: 'Active',
      });

      createSendToken(customGoogleUser, 200, res, true);
    } else {
      if (userFind.status === 'Pending') {
        const filter = { email: googleUser.email };
        const update = { status: 'Active' };
        const updateUser = await User.findOneAndUpdate(filter, update, {
          new: true,
        });

        createSendToken(updateUser, 200, res, true);
      }
      if (userFind.status === 'Active') {
        createSendToken(userFind, 200, res, true);
      }
    }
  } catch (err) {
    return next(
      new AppError('There was an unexpected error with google auth', 401),
    );
  }
});

exports.signup = catchAsync(async (req, res, next) => {
  console.log('signup function called');
  // const token = jwt.sign({ email: req.body.email }, process.env.JWT_SECRET);
  const activeToken = createActiveAccountToken();
  const alreadyUser = await User.findOne({
    email: req.body.email,
  });

  if (alreadyUser) {
    return next(
      new AppError(
        'User with this email already exists. Please login or use another email!',
        500,
      ),
    );
  }

  const newUser = await User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    activeToken,
    // createSendToken(newUser, 201, res);
  });

  console.log('front path subito prima', FRONT_PATH);
  const activeAccountURL = `${FRONT_PATH}/confirmAccount/${activeToken}`;

  // const messageActive = `${activeAccountURL}\n`;

  const htmlActive = `<body><h1>StudyBuddyHub</h1><h2>Email Confirmation</h2>
  <h3>👋 Hello ${newUser.userName} ! 👋 </h3>
  <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
  <a href=${activeAccountURL}> Click here</a>
  </div><p>If you not subscribe at STUDY BUDDY HUB please ignore this email</p></body>`;

  try {
    if (process.env.NODE_ENV === 'production') {
      console.log('sendmailprod');

      await sendEmailProd({
        email: newUser.email,
        subject: 'Please activate your account',
        html: htmlActive,
        from: 'StudyBuddyHub',
      });
    } else {
      console.log('sendmaildev');
      await sendEmailDev({
        email: newUser.email,
        subject: 'Please activate your account',
        html: htmlActive,
        from: 'StudyBuddyHub',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    // user.passwordResetToken = undefined;
    // user.passwordResetExpires = undefined;
    await User.findByIdAndDelete(newUser.id);
    // await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check of email and password exists
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  // const user = (await User.findOne({ email })).select('+password');
  const user = await User.findOne({ email }).select('+password');

  // const correct = await user.correctPassword(password, user.password);
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect Email or password', 401));
  }

  if (user.status === 'Pending') {
    return next(new AppError('Pending Account.Please verify your Email!', 401));
  }

  if (user.status === 'Ban') {
    return next(new AppError('Banned Account !', 401));
  }

  if (user.status !== 'Active') {
    return next(
      new AppError(
        'Account status is Not Active please contact the support !',
        401,
      ),
    );
  }

  // 3) If everything ok , send token to client
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // 1) Getting token and Check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to access. ', 401),
    );
  }
  // 2) Verification
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded._id);

  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401,
      ),
    );
  }

  // 4) Check if user changed password after the JWT was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'User recentlty changed password! Please log in again.',
        401,
      ),
    );
  }
  // GRANT ACCES TO PROTECTED ROUTE
  req.user = currentUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles  ["admin","mod","user"]  role="user"

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403),
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError('There is no user with this email address', 404));
  }
  // 2) Generate the random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${FRONT_PATH}/resetPassword/${resetToken}`;
  const message = `Forgot password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}\nIf you didn't forget password, please ignore this email! `;
  const htmlActive = `<body><h1>StudyBuddyHub</h1><h2>Forgot Password</h2>
  <h3>Hello ! 🎈</h3>
  <p>If you request a help because you forgot password click this link :</p>
  <a href=${resetURL}> Click here</a>
  </div><p>If you not request passord reset from STUDY BUDDY HUB please ignore this email</p></body>`;
  try {
    // if (process.env.NODE_ENV === 'production') {
    //   await sendEmailProd({
    //     email: newUser.email,
    //     subject: 'Please activate your account',
    //     html: htmlActive,
    //     from: 'StudyBuddyHub',
    //   });
    // } else {
    //   await sendEmailDev({
    //     email: newUser.email,
    //     subject: 'Please activate your account',
    //     html: htmlActive,
    //     from: 'StudyBuddyHub',
    //   });
    // }
    if (process.env.NODE_ENV === 'production') {
      await sendEmailProd({
        email: user.email,
        subject: 'Your password reset token (valide for 10 min)',
        message,
        from: 'StudyBuddyHub',
        html: htmlActive,
      });
    } else {
      await sendEmailDev({
        email: user.email,
        subject: 'Your password reset token (valide for 10 min)',
        message,
        from: 'StudyBuddyHub',
        html: htmlActive,
      });
    }
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500,
      ),
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  // 2) If token has not expired,and there is user,set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  // 3) Update changedPasswordAt propertt for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
});

// not used in StudyBuddyHub
exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct

  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }
  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!
  // 4) Log user in , send JWT
  createSendToken(user, 200, res);
});

exports.updateStatus = confirmAccount(User);
