const authController = require('../../controllers/auth.controller');
const router = require('express').Router();

router.post('/google/login', authController.googleSignIn);

module.exports = router;