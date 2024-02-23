const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prix: { type: Number, required: true },
  duree: { type: Number, required: true },
  commission: { type: Number, required: true },
  image: { type: String },
});

const ServiceModel = mongoose.model('services', ServiceSchema);

module.exports = {ServiceModel};
