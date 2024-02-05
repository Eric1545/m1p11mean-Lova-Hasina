// src/routes/index.js
const express = require('express');
const exampleRoutes = require('./exampleRoutes');

const router = express.Router();

router.use('/example', exampleRoutes);

module.exports = router;
