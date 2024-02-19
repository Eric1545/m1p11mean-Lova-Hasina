const jwt = require('jsonwebtoken');
const config = require('../config/config');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).json({ message: 'Token non fourni.' });
  }

  jwt.verify(token, config.privateKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalide.' });
    }
    req.username = decoded.username;
    next();
  });
}

function createToken(username) {
  return jwt.sign({ username }, config.privateKey, { expiresIn: '1h' }); //eto le validité an le token 
}
function createTokenLien(username){
  return jwt.sign({ username }, config.privateKey, {expiresIn: '5m'})
}
module.exports = {
    verifyToken,
    createToken,
    createTokenLien
};