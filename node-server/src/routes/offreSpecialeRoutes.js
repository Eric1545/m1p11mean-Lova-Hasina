// src/routes/exampleRoutes.js
const express = require('express');
const OffreSpecialeController = require('../controllers/OffreSpecialeController');
// const exampleController = require('../controllers/exampleController');

const router = express.Router();

router.post('/', OffreSpecialeController.ajouterOffreSpeciale);

module.exports = router;