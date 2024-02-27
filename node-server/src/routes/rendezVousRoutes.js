// src/routes/exampleRoutes.js
const express = require('express');
const RendezVousController = require('../controllers/RendezVousController');

const rendezVousRoutes = express.Router();

rendezVousRoutes.get('/getRendezVous/:id/:pageNumber/:pageSize', RendezVousController.getRendezVous);
rendezVousRoutes.post('/', RendezVousController.createRendezVous);
rendezVousRoutes.post('/ajouterPanier', RendezVousController.ajouterAuPanier);
rendezVousRoutes.post('/supprimerServiceAuPanier', RendezVousController.supprimerServiceAuPanier);
rendezVousRoutes.get('/nbServiceAuPanier/:idClient', RendezVousController.compteNbServiceAuPanier);
rendezVousRoutes.get('/obtenirDernierPanierParIdClient/:idClient', RendezVousController.obtenirDernierPanierParIdClient);

module.exports = rendezVousRoutes;
