const mongoose = require('mongoose')
const { Schema } = mongoose

const factureSchema = new mongoose.Schema({
    client_id: {
        type:Schema.Types.ObjectId,
        ref:'accounts',
        required: true
    },
    employe_id: {
        type:Schema.Types.ObjectId,
        ref:'accounts',
        required: true
    },
    liste_service: [{
        type: Schema.Types.ObjectId,
        ref: "services",
        required: true
    }],
    liste_reduction: [{
        type: Number,
        required: true
    }],
    completion: {
        type: Boolean,
        default: null
    }
});


const FactureModel = mongoose.model('factures', factureSchema);

module.exports = FactureModel;
