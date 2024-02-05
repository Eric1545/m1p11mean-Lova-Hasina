// src/routes/index.js
const express = require('express');
const exampleRoutes = require('./exampleRoutes');
const accountRoutes = require('./accountRoutes');

const router = express.Router();

router.use('/example', exampleRoutes);
router.use('/account', accountRoutes);

module.exports = router;
