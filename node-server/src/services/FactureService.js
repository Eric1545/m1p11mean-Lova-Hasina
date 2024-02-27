const AccountModel = require("../models/AccountModel");
const FactureModel = require("../models/FactureModel");
const { ServiceModel } = require("../models/ServiceModel");

async function getFactureClient(pageNumber, pageSize, idClient) {
    try {
        const skip = (pageNumber - 1) * pageSize;
        const rendezVous = await FactureModel.find({ client_id: idClient })
            .populate({ path: 'client_id', model: AccountModel })
            .populate({ path: 'employe_id', model: AccountModel })
            .populate({ path: 'liste_service', model: ServiceModel })
            .skip(skip)
            .limit(pageSize);
        return rendezVous;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
async function countFactureClient(idClient) {
    try {
        const rendezVous = await FactureModel.countDocuments({ client_id: idClient })
        return rendezVous;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
async function payerFacture(idFacture){
    try {
        const facture = await FactureModel.findOneAndUpdate({_id:idFacture},{completion:true});
        return facture;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
async function createFacture(postData) {
    const factureModel = new FactureModel(postData);
    factureModel.save();
    return 'Données postées traitées avec succès';
}
module.exports = {
    getFactureClient,
    createFacture,
    countFactureClient,
    payerFacture
}