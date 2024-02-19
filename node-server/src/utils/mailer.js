
const nodemailer = require('nodemailer');
const config = require('../config/config');
const { createTokenLien } = require('../middleware/auth');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.mail,
    pass: config.mailpassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function envoyerEmail(destinataire, sujet, contenu) {
  try {
    const mailOptions = {
      from: config.mail,
      to: destinataire,
      subject: sujet,
      text: contenu
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès :', info.response);
    return info;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    throw error;
  }
}

async function envoyerForgotPassword(mail){
  
  const token = createTokenLien(mail)
  const resetPasswordLink = `${config.reinitilaiserMdp}/reinitilaserMdp/${token}`
  try {
    const mailOptions = {
      from: config.mail,
      to: mail,
      subject: "Mot de passe Oublié",
      html: `<p>Bonjour,</p><p>Veuillez cliquer sur ce <a href="${resetPasswordLink}">lien</a> pour réinitialiser votre mot de passe.</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail envoyé avec succès :', info.response);
    return info;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
    throw error;
  }
}
module.exports = { envoyerEmail,envoyerForgotPassword };
