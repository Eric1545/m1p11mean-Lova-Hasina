const AccountModel = require("../models/AccountModel");
const RoleModel = require('../models/RoleModel');

async function getAccount() {
  try {
    const accounts = await AccountModel.find({});
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

module.exports = {
  getAccount,
  createAccount,
};
