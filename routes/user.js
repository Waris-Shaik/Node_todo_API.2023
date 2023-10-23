const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { isAuthenticated } = require('../middlewares/auth');

router.get('/all', isAuthenticated, userController.getAllUsers);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.post('/new', userController.register);
router.get('/me', isAuthenticated, userController.getMyProfile);



exports.router = router;