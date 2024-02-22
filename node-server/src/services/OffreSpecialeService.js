const mongoose = require('mongoose');
const OffreSpecialeModel = require("../models/OffreSpeciale");
const {ServiceModel} = require("../models/ServiceModel");

async function ajouterOffreSpeciale(nouvelleOffre) {
    /*try {
        // Récupérer les objets de service à partir de leurs IDs
        const services = await Promise.all(nouvelleOffre.liste_service.map(serviceId => ServiceModel.findById(serviceId)));

        // Vérifier si tous les services ont été trouvés
        if (services.some(service => !service)) {
            throw new Error('Certains services n\'ont pas été trouvés.');
        }

        // Créer l'objet d'offre spéciale en utilisant les services récupérés
        const offreSpeciale = new OffreSpecialeModel({
            nom: nouvelleOffre.nom,
            description: nouvelleOffre.description,
            date_debut: nouvelleOffre.date_debut,
            date_fin: nouvelleOffre.date_fin,
            liste_service: services,
            liste_reduction: nouvelleOffre.liste_reduction,
        });

        // Enregistrer l'offre spéciale dans la base de données
        const result = await offreSpeciale.save();

        return result;
    } catch (erreur) {
        console.error('Erreur lors de l\'insertion de l\'offre spéciale :', erreur.message);
        throw erreur;
    }*/

    try {

        const offreSpeciale = new OffreSpecialeModel(nouvelleOffre);

        return await offreSpeciale.save();
    } catch (erreur) {
        console.error('Erreur lors de l\'insertion de l\'offre spéciale :', erreur.message);
        throw erreur;
    }
}

module.exports = {
    ajouterOffreSpeciale,
};
