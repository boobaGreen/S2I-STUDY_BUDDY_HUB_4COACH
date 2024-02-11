exports.test = (req, res, next) => {
  //SEND RESPONSE
  console.log('test ok!!');
  res.status(200).json({
    status: 'success',
    data: {},
    requestedAt: req.requestTime,
  });
};
