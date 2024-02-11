const express = require('express');
const masterController = require('../controllers/masterController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
router.use(authController.protect);
// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews
// POST /reviews
router.route('/').get(masterController.getAllMasters).post(
  authController.restrictTo('admin'),
  // schoolController.setTourUserIds,
  masterController.createMaster,
);

router
  .route('/:id')
  .get(masterController.getMaster)
  .patch(
    authController.restrictTo('admin', 'mod'),
    masterController.updateMaster,
  )
  .delete(
    authController.restrictTo('admin', 'mod'),
    masterController.deleteMaster,
  );

module.exports = router;
