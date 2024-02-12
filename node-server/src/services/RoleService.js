const RoleModel = require('../models/RoleModel');

async function getRole() {
  try {
    const role = await RoleModel.find()
    return role;
  } catch (error) {
    console.error('Error fetching data from database:', error);
    throw error;
  }
}
module.exports = {
  getRole,
};
