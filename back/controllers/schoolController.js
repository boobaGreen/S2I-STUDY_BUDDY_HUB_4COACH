const School = require('../models/schoolModel');
//const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// exports.setUserIds = (req, res, next) => {
//   //Allow nested routes
//   if (!req.body.group) req.body.group = req.params.tourId;
//   if (!req.body.user) req.body.user = req.user.id;
//   next();
// };

exports.getAllSchools = factory.getAll(School);
exports.getSchool = factory.getOne(School);
exports.createSchool = factory.createOne(School);
exports.deleteSchool = factory.deleteOne(School);
exports.updateSchool = factory.updateOne(School);
