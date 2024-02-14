// src/routes/index.js
const express = require('express');
const exampleRoutes = require('./exampleRoutes');
const accountRoutes = require('./accountRoutes');
const serviceRoutes = require('./serviceRoutes');
const { handleFileUpload } = require('../controllers/FileController');

const router = express.Router();

router.use('/example', exampleRoutes);
router.use('/account', accountRoutes);
router.use('/service', serviceRoutes);
router.post('/upload', handleFileUpload);
module.exports = router;
