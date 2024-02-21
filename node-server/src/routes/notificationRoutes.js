const express = require('express');
const NotificationsController = require('../controllers/NotificationsController');


const notificationRoutes = express.Router();

notificationRoutes.get('/getNotification/:idUtilisateur', NotificationsController.getNotification);
notificationRoutes.post('/', NotificationsController.createNotification);

module.exports = notificationRoutes;
