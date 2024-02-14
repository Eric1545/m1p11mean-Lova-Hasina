// src/routes/index.js
const express = require('express');
const exampleRoutes = require('./exampleRoutes');
const accountRoutes = require('./accountRoutes');
const serviceRoutes = require('./serviceRoutes');
const roleRoutes = require('./roleRoutes');
const { handleFileUpload } = require('../controllers/FileController');

const router = express.Router();

router.use('/example', exampleRoutes);
router.use('/account', accountRoutes);
router.use('/service', serviceRoutes);
router.use('/role', roleRoutes);
router.post('/upload', handleFileUpload);
module.exports = router;
