const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const offreSpecialeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  date_debut: { type: Date, required: true },
  date_fin: { type: Date, required: true },
  liste_service: [{
    type: Schema.Types.ObjectId,
    ref: "services",
    required: true
  }],
  liste_reduction: [{
    type: Number,
    required: true
  }]
});

const OffreSpecialeModel = mongoose.model('offre_speciales', offreSpecialeSchema);

module.exports = OffreSpecialeModel;
