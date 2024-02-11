const Group = require('../models/groupModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactoryGroup');
// const User = require('../models/userModel');
// const GoogleUser = require('../models/userGoogleModel');

exports.setUserDetails = (req, res, next) => {
  // Allow nested routes

  req.body.user = req.user._id;
  req.body.type = 'User';

  next();
};

exports.isFounder = catchAsync(async (req, res, next) => {
  const doc = await Group.findById(req.params.id);

  if (!doc) {
    return next(new AppError('Group not found', 404));
  }

  if (!(doc.founder.toString() === req.user._id.toString())) {
    return next(new AppError('Only founder can delete a group', 403));
  }

  next();
});

exports.joinTest = catchAsync(async (req, res, next) => {
  const doc = await Group.findById(req.params.id);

  if (!doc) {
    return next(new AppError('Group not found', 404));
  }

  if (doc.founder.toString() === req.user._id.toString()) {
    return next(new AppError('Founder cant join his own group!', 403));
  }

  const isUserAlreadyParticipant = doc.participants.some(
    (participant) => participant.user.toString() === req.user._id.toString(),
  );

  if (isUserAlreadyParticipant) {
    return next(
      new AppError('User is already a participant in this group', 403),
    );
  }

  if (doc.participants.length > doc.maxParticipants) {
    return next(
      new AppError(
        'The group has already reached its maximum number of participants',
        403,
      ),
    );
  }

  const newParticipant = {
    user: req.user._id,
    type: req.user.type,
  };

  const updatedParticipants = [...doc.participants, newParticipant];

  req.body.participants = updatedParticipants;

  next();
});

exports.joinGroup = catchAsync(async (req, res, next) => {
  const doc = await Group.findByIdAndUpdate(
    req.params.id,
    { participants: req.body.participants },
    { new: true },
  );

  if (!doc) {
    return next(new AppError('Group not found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      group: doc,
    },
  });
});

exports.leaveGroup = catchAsync(async (req, res, next) => {
  const doc = await Group.findById(req.params.id);

  if (!doc) {
    return next(new AppError('Group not found', 404));
  }

  const isUserParticipant = doc.participants.some(
    (participant) => participant.user.toString() === req.user._id.toString(),
  );

  if (!isUserParticipant) {
    return next(new AppError('User is not a participant in this group', 403));
  }

  const updatedParticipants = doc.participants.filter(
    (participant) => participant.user.toString() !== req.user._id.toString(),
  );

  const updatedGroup = await Group.findByIdAndUpdate(
    req.params.id,
    { participants: updatedParticipants },
    { new: true },
  );

  res.status(200).json({
    status: 'success',
    data: {
      group: updatedGroup,
    },
  });
});

exports.createGroup = catchAsync(async (req, res, next) => {
  const doc = {
    name: req.body.name,
    course: req.body.course,
    master: req.body.master,
    school: req.body.school,
    founder: req.body.user,
  };

  const finalDoc = await Group.create(doc);

  res.status(201).json({
    status: 'success',
    data: finalDoc,
  });
});

exports.getGroupChat = catchAsync(async (req, res, next) => {
  try {
    const group = await Group.findById(req.params.id);

    if (
      req.user.id !== group.founder.toString() &&
      !group.participants.some(
        (participant) => participant.user.toString() === req.user.id,
      )
    ) {
      return next(
        new AppError(
          'You do not have permission to access the chat of this group',
          403,
        ),
      );
    }
    res.status(200).json({
      status: 'success',
      data: {
        chat: group.chat,
      },
    });
  } catch (error) {
    console.error('Error in getGroupChat:', error);
    next(error);
  }
});

exports.sendMessage = catchAsync(async (req, res, next) => {
  try {
    const filter = { _id: req.params.id };
    const update = {
      $push: {
        chat: {
          user: req.user._id,
          type: req.user.type,
          message: req.body.text,
        },
      },
    };

    const updatedGroup = await Group.findOneAndUpdate(filter, update, {
      new: true,
      runValidators: true,
    });

    if (!updatedGroup) {
      return next(new AppError('Group not found', 404));
    }

    const newMessage = updatedGroup.chat[updatedGroup.chat.length - 1];

    res.status(201).json({
      status: 'success',
      data: {
        message: newMessage,
      },
    });
  } catch (error) {
    console.error('Error in sendMessage:', error);
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      error: error.message,
    });
  }
});

exports.deleteGroup = factory.deleteOne(Group);
exports.getGroup = factory.getOne(Group);
exports.updateGroup = factory.updateOne(Group);
exports.getAllGroups = factory.getAll(Group);
