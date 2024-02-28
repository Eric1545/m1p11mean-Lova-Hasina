// src/routes/exampleRoutes.js
const express = require('express');
const StatistiqueController = require('../controllers/StatistiqueController');


const statistiqueRoutes = express.Router();

statistiqueRoutes.get('/tempsMoyenTravailEmploye', StatistiqueController.tempsMoyenTravailEmploye);

module.exports = statistiqueRoutes;
