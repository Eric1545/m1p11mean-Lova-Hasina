// src/routes/exampleRoutes.js
const express = require('express');
const RendezVousController = require('../controllers/RendezVousController');

const rendezVousRoutes = express.Router();

rendezVousRoutes.get('/getRendezVous/:id/:pageNumber/:pageSize', RendezVousController.getRendezVous);
rendezVousRoutes.get('/:id', RendezVousController.findRendezVousById);
rendezVousRoutes.get('/terminerRdv/:idRdv', RendezVousController.terminerRdv);
rendezVousRoutes.post('/rdvParEmploye', RendezVousController.obtenirRdvParEmploye);
rendezVousRoutes.post('/rdvTerminerParEmploye', RendezVousController.obtenirRdvTerminerParEmploye);
rendezVousRoutes.post('/', RendezVousController.createRendezVous);
rendezVousRoutes.post('/ajouterPanier', RendezVousController.ajouterAuPanier);
rendezVousRoutes.post('/supprimerServiceAuPanier', RendezVousController.supprimerServiceAuPanier);
rendezVousRoutes.post('/nbRdvParJours', RendezVousController.nbRdvParJours);
rendezVousRoutes.post('/nbRdvParMois', RendezVousController.nbRdvParMois);
rendezVousRoutes.post('/nbRdvParJoursMois', RendezVousController.nbRdvParJoursMois);
rendezVousRoutes.get('/nbServiceAuPanier/:idClient', RendezVousController.compteNbServiceAuPanier);
rendezVousRoutes.get('/obtenirDernierPanierParIdClient/:idClient', RendezVousController.obtenirDernierPanierParIdClient);

module.exports = rendezVousRoutes;
