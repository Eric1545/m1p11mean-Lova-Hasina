const PanierModel = require("../models/PanierModel");
const {ServiceModel} = require("../models/ServiceModel");


async function obtenirPanier() {
    try {
        const panier = await PanierModel.find({});
        return panier;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

async function obtenirPanierParId(idPanier) {
    try {
        const panier = await PanierModel.findById(idPanier);
        return panier;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

async function obtenirDernierPanierParIdClient(idClient) {
    try {
        const panier = await PanierModel.find({
            client_id: idClient,
            est_inserer: false
        });
        return panier.length > 0 ? panier[0] : null;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

async function obtenirDernierPanierObjetParIdClient(idClient) {
    try {
        const panier = await PanierModel.find({
            client_id: idClient,
            est_inserer: false
        }).populate('services');
        return panier.length > 0 ? panier[0] : null;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

async function createPanier(postData) {
    try {
        const panier = new PanierModel(postData);
        await panier.save();
        return 'Données postées traitées avec succès';
    } catch (error) {
        console.error('Error saving data to database:', error);
        throw error;
    }
}

async function supprimerPanier(idPanier) {
    try {
        const result = await PanierModel.deleteOne({ _id: idPanier });

        if (result.deletedCount === 0) {
            throw new Error('Panier non trouvé');
        }

        return 'Panier supprimé avec succès';
    } catch (erreur) {
        console.error('Erreur lors de la suppression du panier :', erreur);
        throw erreur;
    }
}

async function supprimerServiceAuPanier(clientId, serviceId) {
    try {
        console.log("clientId = ", clientId)
        console.log("serviceId = ", serviceId)
        const result = await PanierModel.updateOne(
            { client_id: clientId, est_inserer: false },
            { $pull: { services: serviceId } }
        );

        if (result.nModified === 0) {
            console.log('Service non trouvé dans le panier')
            throw new Error('Service non trouvé dans le panier');
        }

        console.log('Service supprimé avec succès')
        return 'Service supprimé avec succès';
    } catch (erreur) {
        console.error('Erreur lors de la suppression du service dans le panier :', erreur);
        throw erreur;
    }
}

async function modifierPanierParId(panierId) {
    try {
        console.log("panierId = ", panierId);

        const result = await PanierModel.updateOne(
            { _id: panierId },
            { $set: { est_inserer: true } }
        );

        if (result.nModified === 0) {
            console.log('Service non trouvé dans le panier');
            throw new Error('Service non trouvé dans le panier');
        }

        console.log('Service supprimé avec succès');
        return 'Service supprimé avec succès';
    } catch (erreur) {
        console.error('Erreur lors de la suppression du service dans le panier :', erreur);
        throw erreur;
    }
}


module.exports = {
    obtenirPanier,
    createPanier,
    supprimerPanier,
    obtenirPanierParId,
    obtenirDernierPanierParIdClient,
    obtenirDernierPanierObjetParIdClient,
    supprimerServiceAuPanier,
    modifierPanierParId
};
