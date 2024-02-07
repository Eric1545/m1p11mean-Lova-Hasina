const ServiceModel = require("../models/ServiceModel");

async function getService() {
    try {
        const service = await ServiceModel.find({});
        return service;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

async function createService(postData) {
    const service = new ServiceModel(postData);
    service.save();
    return 'Données postées traitées avec succès';
}
module.exports = {
    getService,
    createService,
};
