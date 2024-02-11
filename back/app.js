const dotenv = require('dotenv');
const cors = require('cors');
//app.js
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser'); // Aggiunto il middleware cookie-parser x jwt
// const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const hpp = require('hpp');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const schoolRouter = require('./routes/schoolRoutes');
const masterRouter = require('./routes/masterRoutes');
const courseRouter = require('./routes/courseRoutes');
const groupRouter = require('./routes/groupRoutes');
const testRouter = require('./routes/testRoutes');

dotenv.config({ path: './config.env' });

const app = express();
// Abilita CORS per tutte le richieste
// app.use(cors());
console.log('process.env', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use(
    cors({
      origin: `${process.env.FRONT_SITE_WEB}`,
    }),
  );
}
if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      origin: `${process.env.FRONT_SITE_LOCAL}`,
    }),
  );
}

app.use(cookieParser()); // Middleware per il parsing dei cookie

// NOTE 1) GLOBAL MIDLLEWAREs
//Set security HTTP headers
app.use(helmet());
// Development loggin
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit request
// const limiter = rateLimit({
//   max: 200000, //da rimetter piu' basso
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many request from this IP, please try again in an hour',
// }); // 429 Error

// app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' })); // Middleware add the data from the body to the request object

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitazation agains XSS
app.use(xss());

// Prevent parameter pollution

app.use(
  hpp({
    whitelist: [
      // 'duration',
      // 'ratingsQuantity',
      // 'ratingsAverage',
      // 'maxGroupSize',
      // 'difficulty',
      // 'price',
    ],
  }),
);
app.use(compression());
// Serving static files
app.use(express.static(`${__dirname}/public`));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

// NOTE 2) ROUTES

// app.use('/api/v1/tours', tourRouter);
app.use('/test', testRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/schools', schoolRouter);
app.use('/api/v1/masters', masterRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/groups', groupRouter);
// app.use('/api/v1/reviews', reviewRouter);

// set route for all no match routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find${req.originalUrl} on this server`, 404));
});

//Global Error Handling Middleware - 4 argument express recognize is a error middleware
app.use(globalErrorHandler);

module.exports = { app }; // Esporta l'oggetto app
