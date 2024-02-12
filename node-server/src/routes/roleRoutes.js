const express = require('express');
const RoleController = require('../controllers/RoleController');
const roleRoutes = express.Router();

roleRoutes.get('/', RoleController.getRole);

module.exports = roleRoutes;
