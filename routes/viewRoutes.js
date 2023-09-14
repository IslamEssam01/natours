const express = require('express');

const viewController = require('./../controllers/viewController');

const authController = require('./../controllers/authController');

const router = express.Router();

// router.get('/', (req, res) => {
//   res.status(200).render('base', {
//     tour: 'The Forest Hiker',
//     user: 'Islam',
//   });
// });
// router.use(authController.isLoggedIn);

router.get('/',authController.isLoggedIn, viewController.getOverView);
router.get('/login',authController.isLoggedIn, viewController.login);
router.get('/tour/:tourSlug',authController.isLoggedIn, viewController.getTour);

router.get('/me', authController.protect, viewController.getAccount);

module.exports = router;
