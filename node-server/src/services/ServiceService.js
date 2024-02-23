const {ServiceModel} = require("../models/ServiceModel");


async function getService() {
    try {
        const service = await ServiceModel.find({});
        return service;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

async function obtenirServiceParId(idService) {
    try {
        const service = await ServiceModel.findById(idService);
        return service;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

async function createService(postData) {
    try {
        const service = new ServiceModel(postData);
        await service.save();
        return 'Données postées traitées avec succès';
    } catch (error) {
        console.error('Error saving data to database:', error);
        throw error;
    }
}

async function modifierService(idService, donneesModifiees) {
    try {
        const serviceModifie = await ServiceModel.findByIdAndUpdate(idService, donneesModifiees, { new: true });
        if (!serviceModifie) {
            throw new Error('Service non trouvé');
        }
        return serviceModifie;
    } catch (erreur) {
        console.error('Erreur lors de la modification du service :', erreur);
        throw erreur;
    }
}

async function supprimerService(idService) {
    try {
        const result = await ServiceModel.deleteOne({ _id: idService });

        if (result.deletedCount === 0) {
            throw new Error('Service non trouvé');
        }

        return 'Service supprimé avec succès';
    } catch (erreur) {
        console.error('Erreur lors de la suppression du service :', erreur);
        throw erreur;
    }
}

module.exports = {
    getService,
    createService,
    modifierService,
    supprimerService,
    obtenirServiceParId
};
