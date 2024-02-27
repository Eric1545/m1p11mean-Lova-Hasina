// src/routes/exampleRoutes.js
const express = require('express');
const FactureController = require('../controllers/FactureController');


const factureRoutes = express.Router();

factureRoutes.get('/getFactureClient/:idClient/:pageNumber/:pageSize', FactureController.getFactureClient);
factureRoutes.post('/', FactureController.createFacture);
factureRoutes.patch('/payerFacture/:idFacture', FactureController.payerFacture);

module.exports = factureRoutes;
