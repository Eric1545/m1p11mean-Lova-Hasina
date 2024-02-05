// src/models/exampleModel.js
const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: Number, required: true },
  date_debut: { type: Date, required: true },
  date_fin: { type: Date, required: true },
});

const ExampleModel = mongoose.model('offre_speciales', exampleSchema);

module.exports = ExampleModel;
