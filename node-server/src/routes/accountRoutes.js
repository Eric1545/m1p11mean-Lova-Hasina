const express = require('express');
const AccountController = require('../controllers/AccountController');
const router = express.Router();

router.get('/', AccountController.getAccount);
router.post('/', AccountController.createAccount);
router.post('/ajouterFavoris/:idUtilisateur/:idFavoris', AccountController.addFavoris);
router.patch('/enleverFavoris/:idUtilisateur/:idFavoris', AccountController.removeFavoris);
router.post('/login', AccountController.login);
router.post('/envoyerMail', AccountController.sendMail);

module.exports = router;
