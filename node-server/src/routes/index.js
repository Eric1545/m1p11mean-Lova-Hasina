const express = require('express');
const exampleRoutes = require('./exampleRoutes');
const accountRoutes = require('./accountRoutes');
const serviceRoutes = require('./serviceRoutes');
const roleRoutes = require('./roleRoutes');
const { handleFileUpload } = require('../controllers/FileController');
const rendezVousRoutes = require('./rendezVousRoutes');

const router = express.Router();

router.use('/example', exampleRoutes);
router.use('/account', accountRoutes);
router.use('/service', serviceRoutes);
router.use('/role', roleRoutes);
router.use('/rendezVous', rendezVousRoutes);
router.post('/upload', handleFileUpload);
module.exports = router;
