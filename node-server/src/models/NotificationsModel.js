const mongoose = require('mongoose');
const { Schema } = mongoose;

const notifiationSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  utilisateur: { type: Schema.Types.ObjectId, ref: 'accounts' },
  lu: { type: Boolean, default: false },
  type: { type: String, required: true },
  id: { type: Schema.Types.ObjectId, required: true },
});

const NotificationsModel = mongoose.model('notifications', notifiationSchema);

module.exports = NotificationsModel;
