const mongoose = require('mongoose')
const { Schema } = mongoose

const accountSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  employe_fav: [{
    type: Schema.Types.ObjectId,
    ref: "accounts",
    default: null,
  }],
  service_favorite: [{
    type: Schema.Types.ObjectId,
    ref: "services",
    default: null,
  }],
  heure_debut: { type: Date, required: true },
  heure_fin: { type: Date, required: true },
  role:{type: Schema.Types.ObjectId, ref: "roles"},
  image_url:{ type: String, required: false}
});


const AccountModel = mongoose.model('accounts', accountSchema);

module.exports = AccountModel;
