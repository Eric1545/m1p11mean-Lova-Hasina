const express = require('express');
const ServiceController = require('../controllers/ServiceController');
const serviceRoutes = express.Router();

serviceRoutes.get('/', ServiceController.getService);
serviceRoutes.post('/', ServiceController.createService);

module.exports = serviceRoutes;
