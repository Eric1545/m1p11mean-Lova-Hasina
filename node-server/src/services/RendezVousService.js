const AccountModel = require("../models/AccountModel");
const RendezVousModel = require("../models/RendezVousModel");
const ServiceModel = require("../models/ServiceModel");

async function getRendezVous(pageNumber, pageSize, id) {
    try {
        const skip = (pageNumber - 1) * pageSize;
        const rendezVous = await RendezVousModel.find({client_id:id})
            .populate({ path: 'client_id', model: AccountModel })
            .populate({ path: 'employe_id', model: AccountModel })
            .populate({ path: 'service_id', model: ServiceModel })
            .skip(skip)
            .limit(pageSize);
        return rendezVous;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
async function count(id){
    try {
        const count = await RendezVousModel.countDocuments({client_id:id});
        return count;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
function createRendezVous(postData) {
    const rendezVousModel = new RendezVousModel(postData);
    rendezVousModel.save();
    return 'Données postées traitées avec succès';
}

module.exports = {
    getRendezVous,
    count,
    createRendezVous
};
