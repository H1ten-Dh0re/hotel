const express = require('express');
const userController = require('../controllers/userController');
const user = require('../models/user');
const router = express.Router();


router.get('/', userController.home);

router.get('/about', userController.about);

router.post('/signIn', userController.signIn);

router.post('/signUp', userController.signUp);

router.post("/api/postData", userController.cartItem)

module.exports = router;
