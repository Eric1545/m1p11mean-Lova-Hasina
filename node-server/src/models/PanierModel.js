const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const panierSchema = new mongoose.Schema({
    client_id: {
        type:Schema.Types.ObjectId,
        ref:'accounts',
        required: true
    },
    est_inserer: {
        type:Boolean,
        default:false
    },
    services: [{
        type: Schema.Types.ObjectId,
        ref: "services",
        required: true
    }]
});

const PanierModel = mongoose.model('panier', panierSchema);

module.exports = PanierModel;
