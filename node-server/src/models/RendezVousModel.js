const mongoose = require('mongoose');
const { Schema } = mongoose

const RendezVousSchema = new mongoose.Schema({
    client_id: {
        type:Schema.Types.ObjectId,
        ref:'accounts',
        default:null
    },
    employe_id: {
        type:Schema.Types.ObjectId,
        ref:'accounts',
        default:null
    },
    service_id: {
        type:Schema.Types.ObjectId,
        ref:'services',
        default:null
    },
    date_heure: {
        type:Date,
        default:mongoose.now
    },
    completion: {
        type:Boolean,
        default: null
    }
});

const RendezVousModel = mongoose.model('rendez_vous', RendezVousSchema);

module.exports = RendezVousModel;
