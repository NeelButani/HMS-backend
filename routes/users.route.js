const { register , login } = require('../controllers/users.controller');
const express = require('express');
const router = express.Router();

// to register a new user
router.post(`/`,register);

// to login user
router.post(`/login`,login)

module.exports = router