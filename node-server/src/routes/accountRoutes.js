const express = require('express');
const AccountController = require('../controllers/AccountController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();

router.get('/getUtilisateur/:pageNumber/:pageSize', AccountController.getAccount);
router.post('/', AccountController.createAccount);
router.post('/ajouterFavoris/:idUtilisateur/:idFavoris', AccountController.addFavoris);
router.patch('/enleverFavoris/:idUtilisateur/:idFavoris', AccountController.removeFavoris);
router.post('/login', AccountController.login);
router.post('/envoyerMail', AccountController.sendMail);
router.post('/mdpoublie', AccountController.sendMailForgotMdp);
router.get('/protected',verifyToken , (req, res) => {
    res.json({ message: 'Cette route est protégée.' });
  });
router.post('/reinitilaserMdp', verifyToken,(req, res) => {
  console.log(req.username)
  res.json({ message: 'Cette route est protégée.' });
});

module.exports = router;
