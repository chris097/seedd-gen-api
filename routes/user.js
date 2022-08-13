const express = require('express');
const { registerUser, loginUser, resetPassword } = require('../controller/user');
const router = express.Router();

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.post('/user/reset-password', resetPassword);

module.exports = router;
