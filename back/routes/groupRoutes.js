// groupRoutes.js

const express = require('express');
const groupController = require('../controllers/groupController');
const authController = require('../controllers/authController');
// Rimuovi l'importazione diretta di io dal server
// const { io } = require('../server');

const router = express.Router({ mergeParams: true });

// Passa io come middleware
// router.use((req, res, next) => {
//   req.io = req.app.get('io');
//   next();
// });

router
  .route('/')
  .get(authController.protect, groupController.getAllGroups)
  .post(
    authController.protect,
    groupController.setUserDetails,
    groupController.createGroup,
  );

router
  .route('/:id')
  .get(authController.protect, groupController.getGroup)
  .patch(authController.protect, groupController.updateGroup)
  .delete(
    authController.protect,
    groupController.isFounder,
    groupController.deleteGroup,
  );
// toglire la possibilita di patchere la chat da sopra
router
  .route('/chat/:id')
  .get(authController.protect, groupController.getGroupChat)
  .post(authController.protect, groupController.sendMessage); // Aggiungi questa linea per associare la funzione sendMessage alla route

router
  .route('/join/:id')
  .patch(
    authController.protect,
    groupController.joinTest,
    groupController.joinGroup,
  );
router
  .route('/leave/:id')
  .patch(authController.protect, groupController.leaveGroup);

module.exports = router;
