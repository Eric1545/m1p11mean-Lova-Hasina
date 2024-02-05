const mongoose = require('mongoose');

const offreSpecialeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: Number, required: true },
  date_debut: { type: Date, required: true },
  date_fin: { type: Date, required: true },
});

const OffreSpecialeModel = mongoose.model('offre_speciales', offreSpecialeSchema);

module.exports = OffreSpecialeModel;
