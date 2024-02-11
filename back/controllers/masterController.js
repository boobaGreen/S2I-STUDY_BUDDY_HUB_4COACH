const Master = require('../models/masterModel');
//const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// exports.setUserIds = (req, res, next) => {
//   //Allow nested routes
//   if (!req.body.group) req.body.group = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id;
//   next();
// };

exports.getAllMasters = factory.getAll(Master);
exports.getMaster = factory.getOne(Master);
exports.createMaster = factory.createOne(Master);
exports.deleteMaster = factory.deleteOne(Master);
exports.updateMaster = factory.updateOne(Master);
