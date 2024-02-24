const AccountModel = require("../models/AccountModel");
const RoleModel = require('../models/RoleModel');
const { ServiceModel } = require("../models/ServiceModel");
const { envoyerEmail, envoyerForgotPassword } = require("../utils/mailer");
const mongoose = require('mongoose');


async function obtenirCompteParId(idCompte) {
  try {
    const compteObjectId = new mongoose.Types.ObjectId(idCompte);
    const a = await AccountModel.findById(compteObjectId);
    console.log(a)
    return a;
  } catch (error) {
    console.error('Error fetching data from database:', error);
    throw error;
  }
}

async function modifierEmploye(idEmploye, donneesModifiees) {
  try {
    const employeModifie = await AccountModel.findByIdAndUpdate(idEmploye, donneesModifiees, { new: true });
    if (!employeModifie) {
      throw new Error('Employe non trouvé');
    }
    return employeModifie;
  } catch (erreur) {
    console.error('Erreur lors de la modification du employe :', erreur);
    throw erreur;
  }
}

async function supprimerEmploye(idEmploye) {
  try {
    const employeObjectId = new mongoose.Types.ObjectId(idEmploye);

     const result = await AccountModel.deleteOne({ _id: employeObjectId });

     if (result.deletedCount === 0) {
         throw new Error('Employe non trouvé');
     }

     return 'Employe supprimé avec succès';
  } catch (erreur) {
    console.error('Erreur lors de la suppression du employe :', erreur);
    throw erreur;
  }
}

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

async function count(){
  try {
      const role = await RoleModel.findOne({ role: 'employe' });
      const count = await AccountModel.countDocuments({role: role._id});
      return count;
  } catch (error) {
      console.error('Error fetching data from database:', error);
      throw error;
  }
}

async function obtenirCompteParRole(roleAChercher) {
  try {
    console.log(roleAChercher)
    const role = await RoleModel.findOne({ role: roleAChercher });
    console.log(role);
    const response = await AccountModel.find({role: role._id});
    console.log(response);
    return response;
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
    const utilisateur = await AccountModel.find({username,password}).populate({path: 'role', model: RoleModel })
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
  modifierEmploye,
  supprimerEmploye,
  obtenirCompteParId,
  obtenirCompteParRole,
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
  count,
};
