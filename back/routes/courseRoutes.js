const express = require('express');
const courseController = require('../controllers/courseController');
const authController = require('../controllers/authController');

const router = express.Router({ mergeParams: true });
router.use(authController.protect);
// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews
// POST /reviews
router.route('/').get(courseController.getAllCourses).post(
  authController.restrictTo('admin'),
  // schoolController.setTourUserIds,
  courseController.createCourse,
);

router
  .route('/:id')
  .get(courseController.getCourse)
  .patch(
    authController.restrictTo('admin', 'mod'),
    courseController.updateCourse,
  )
  .delete(
    authController.restrictTo('admin', 'mod'),
    courseController.deleteCourse,
  );

module.exports = router;
