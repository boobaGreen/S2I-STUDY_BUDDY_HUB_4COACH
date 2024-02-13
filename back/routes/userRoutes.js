//userRoute.js

const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/requestUrlOgoogle', authController.requestUrlOgoogle);
router.get('/oauthGoogle', authController.oauthGoogle);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/confirmAccount/:activeToken', authController.updateStatus);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// PROTECT ALL ROUTES AFTER THIS MIDDLEWARE!!!!
router.use(authController.protect);

router.get('/validateToken', userController.validateToken);
router.patch(authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

// RESTRICT TO ADMIN ALL ROUTES AFTER THIS MIDDLEWARE!!
router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
