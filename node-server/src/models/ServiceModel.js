const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prix: { type: Number, required: true },
  duree_minute: { type: Number, required: true },
  commission: { type: Number, required: true },
});

const ServiceModel = mongoose.model('services', ServiceSchema);

module.exports = ServiceModel;
