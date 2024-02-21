const express = require('express');
const ServiceController = require('../controllers/ServiceController');
const serviceRoutes = express.Router();

serviceRoutes.get('/', ServiceController.getService);
serviceRoutes.get('/:_id', ServiceController.obtenirServiceParId);
serviceRoutes.post('/', ServiceController.createService);
serviceRoutes.put('/:_id', ServiceController.modifierService);
serviceRoutes.delete('/:_id', ServiceController.supprimerService);

module.exports = serviceRoutes;
