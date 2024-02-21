const express = require('express');
const AccountController = require('../controllers/AccountController');
const { verifyToken } = require('../middleware/auth');
const router = express.Router();
const io = require('socket.io')()

router.get('/getUtilisateur/:pageNumber/:pageSize', AccountController.getAccount);
router.get('/getUtilisateurById/:id', AccountController.getUserById);
router.post('/', AccountController.createAccount);
router.post('/ajouterUserFavoris/:idUtilisateur/:idFavoris', AccountController.addFavoris);
router.patch('/enleverUserFavoris/:idUtilisateur/:idFavoris', AccountController.removeFavoris);
router.post('/ajouterServiceFavoris/:idUtilisateur/:idFavoris', AccountController.addServiceFavoris);
router.patch('/enleverServiceFavoris/:idUtilisateur/:idFavoris', AccountController.removeServiceFavoris);
router.post('/login', AccountController.login);
router.post('/envoyerMail', AccountController.sendMail);
router.post('/mdpoublie', AccountController.sendMailForgotMdp);
router.get('/protected',verifyToken , (req, res) => {
    res.json({ message: 'Cette route est protégée.' });
    
    io.emit('protectedRouteCalled', { message: 'La route protégée a été appelée' });
  });
router.get('/testSocket' , (req, res) => {
  res.json({ message: 'Cette route est protégée.' });
  
  io.emit('protectedRouteCalled', { message: 'La route protégée a été appelée' });
});
router.post('/reinitilaserMdp', verifyToken,AccountController.reinitilaserMdp);

module.exports = router;
