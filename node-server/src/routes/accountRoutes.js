const express = require('express');
const AccountController = require('../controllers/AccountController');
const router = express.Router();

router.get('/', AccountController.getAccount);
router.post('/', AccountController.createAccount);

module.exports = router;
