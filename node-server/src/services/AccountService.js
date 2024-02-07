const AccountModel = require("../models/AccountModel");
const RoleModel = require('../models/RoleModel');

async function getAccount() {
  try {
    const accounts = await AccountModel.find({}).populate({ path: 'role', model: RoleModel });
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
module.exports = {
  getAccount,
  createAccount,
  addFavoris,
  removeFavoris,
};
