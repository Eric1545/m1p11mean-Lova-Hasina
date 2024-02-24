// src/routes/exampleRoutes.js
const express = require('express');
const OffreSpecialeController = require('../controllers/OffreSpecialeController');
// const exampleController = require('../controllers/exampleController');

const router = express.Router();

router.post('/', OffreSpecialeController.ajouterOffreSpeciale);
router.get('/', OffreSpecialeController.obtenirOffreSpeciale);
router.get('/getAllOffreService/:pageNumber/:pageSize', OffreSpecialeController.getAllOffreSpeciale);
router.get('/:id', OffreSpecialeController.obtenirOffreSpecialeParId);
router.put('/:id', OffreSpecialeController.modifierOffreSpeciale);
router.delete('/:id', OffreSpecialeController.supprimerOffreSpeciale);

module.exports = router;