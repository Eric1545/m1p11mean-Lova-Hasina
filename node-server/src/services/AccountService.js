const AccountModel = require("../models/AccountModel");
const RoleModel = require('../models/RoleModel');
const ServiceModel = require("../models/ServiceModel");
const { envoyerEmail, envoyerForgotPassword } = require("../utils/mailer");

async function getAccount(pageNumber, pageSize) {
  try {
    const skip = (pageNumber - 1) * pageSize;
    const role = await RoleModel.findOne({ role: 'employe' });
    console.log(role);
    const accounts = await AccountModel.find({role: role._id})
      .populate({ path: 'role', model: RoleModel })
      .skip(skip)
      .limit(pageSize);
    return accounts;
  } catch (error) {
    console.error('Error fetching data from database:', error);
    throw error;
  }
}
async function getUserById(id) {
  try {
    const accounts = await AccountModel.findOne({_id: id})
      .populate({ path: 'role', model: RoleModel })
      .populate({ path: 'service_favorite',model:ServiceModel})
      .populate({ path : 'employe_fav', model:AccountModel})
    return accounts;
  } catch (error) {
    console.error('Error fetching data from database:', error);
    throw error;
  }
}

async function createAccount(postData) {
  const exampleModel = new AccountModel(postData);
  exampleModel.save();
  return 'Données postées traitées avec succès';
}

async function addFavoris(idUtilisateur, idFavoris) {
  try {
    const utilistateur = await AccountModel.findByIdAndUpdate(
      idUtilisateur,
      {
        $addToSet: { employe_fav: idFavoris }
      },
      { new: true }
    ).populate({ path: 'role', model: RoleModel })
    return utilistateur
  }
  catch (error) {
    console.error(error)
    throw error
  }
}

async function addServiceFavoris(idUtilisateur, idFavoris) {
  try {
    const utilistateur = await AccountModel.findByIdAndUpdate(
      idUtilisateur,
      {
        $addToSet: { service_favorite: idFavoris }
      },
      { new: true }
    ).populate({ path: 'role', model: RoleModel })
    return utilistateur
  }
  catch (error) {
    console.error(error)
    throw error
  }
}
async function removeFavoris(idUtilisateur, idFavoris){
  try {
    const utilistateur = await AccountModel.findByIdAndUpdate(
      idUtilisateur,
      {
        $pull: {employe_fav: idFavoris}
      },
      { new: true }
    ).populate({path: 'role', model: RoleModel })
    return utilistateur
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function removeServiceFavoris(idUtilisateur, idFavoris){
  try {
    const utilistateur = await AccountModel.findByIdAndUpdate(
      idUtilisateur,
      {
        $pull: {service_favorite: idFavoris}
      },
      { new: true }
    ).populate({path: 'role', model: RoleModel })
    return utilistateur
  } catch (error) {
    console.error(error)
    throw error
  }
}
async function login(username, password){
  try{
    const utilisateur = await AccountModel.find({username,password})
    return utilisateur
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function reinitilaserMdp(email, password){
  try{
    const utilisateur = await AccountModel.findOneAndUpdate({email:email}, {password:password}, {
      new: true
    });
    return utilisateur
  } catch(error){
    console.log(error)
    throw error
  }
}
async function sendMailToUser(email, subject, content){
  try{
    await envoyerEmail(email, subject, content)
  } catch (error) {
    console.error(error)
    throw error
  }
}
async function sendMailForgotMdp ( email ){
  try{
    await envoyerForgotPassword(email)
  } catch (error) {
    console.error(error)
    throw error
  }
}
module.exports = {
  getAccount,
  createAccount,
  addFavoris,
  removeFavoris,
  login,
  sendMailToUser,
  sendMailForgotMdp,
  reinitilaserMdp,
  addServiceFavoris,
  removeServiceFavoris,
  getUserById,
};
