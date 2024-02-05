// src/models/exampleModel.js
const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  role: { type: String, required: true },
});

const RoleModel = mongoose.model('Roles', RoleSchema);

module.exports = RoleModel;
