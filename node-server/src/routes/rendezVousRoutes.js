// src/routes/exampleRoutes.js
const express = require('express');
const RendezVousController = require('../controllers/RendezVousController');

const rendezVousRoutes = express.Router();

rendezVousRoutes.get('/getRendezVous/:id/:pageNumber/:pageSize', RendezVousController.getRendezVous);
rendezVousRoutes.get('/:id', RendezVousController.findRendezVousById);
rendezVousRoutes.post('/', RendezVousController.createRendezVous);

module.exports = rendezVousRoutes;
