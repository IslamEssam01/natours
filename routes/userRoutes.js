const express = require('express');

const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// router.patch('/me', authController.protect, userController.updateMe);
// router.delete('/me', authController.protect, userController.deleteMe);

router.use(authController.protect);
router
  .route('/me')
  .get(userController.getMe, userController.getUser)
  .patch(
    userController.uploadPhoto,
    userController.resizeUserPhoto,
    userController.updateMe
  )
  .delete(userController.deleteMe);

router.patch('/updateMyPassword', authController.updatePassword);

router.use(authController.restrictTo('admin'));
router.route('/').get(userController.getAllUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
