const express = require('express');
const schoolController = require('../controllers/schoolController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
router.use(authController.protect);
// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews
// POST /reviews
router.route('/').get(schoolController.getAllSchools).post(
  authController.restrictTo('admin'),
  // schoolController.setTourUserIds,
  schoolController.createSchool,
);

router
  .route('/:id')
  .get(schoolController.getSchool)
  .patch(
    authController.restrictTo('admin', 'mod'),
    schoolController.updateSchool,
  )
  .delete(
    authController.restrictTo('admin', 'mod'),
    schoolController.deleteSchool,
  );

module.exports = router;
