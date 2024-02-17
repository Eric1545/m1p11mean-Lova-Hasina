// src/routes/exampleRoutes.js
const express = require('express');
const RendezVousController = require('../controllers/RendezVousController');

const rendezVousRoutes = express.Router();

rendezVousRoutes.get('/getRendezVous/:pageNumber/:pageSize', RendezVousController.getRendezVous);
rendezVousRoutes.post('/', RendezVousController.createRendezVous);

module.exports = rendezVousRoutes;
