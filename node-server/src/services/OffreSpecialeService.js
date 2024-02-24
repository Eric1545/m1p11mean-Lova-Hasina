const mongoose = require('mongoose');
const OffreSpecialeModel = require("../models/OffreSpeciale");
const { ServiceModel } = require("../models/ServiceModel");



async function supprimerOffreSpeciale(idOffreSpeciale) {
    try {
        const result = await OffreSpecialeModel.deleteOne({ _id: idOffreSpeciale });

        if (result.deletedCount === 0) {
            throw new Error('Offre speciale non trouvé');
        }

        return 'Offre speciale supprimé avec succès';
    } catch (erreur) {
        console.error('Erreur lors de la suppression du service :', erreur);
        throw erreur;
    }
}

async function modifierOffreSpeciale(idOffreSpeciale, donneesModifiees) {
    try {
        const offreSpecialeModifie = await OffreSpecialeModel.findByIdAndUpdate(idOffreSpeciale, donneesModifiees, { new: true });
        if (!offreSpecialeModifie) {
            throw new Error('Offre speciale non trouvé');
        }
        return offreSpecialeModifie;
    } catch (erreur) {
        console.error('Erreur lors de la modification de l\'offre speciale :', erreur);
        throw erreur;
    }
}

async function obtenirOffreSpeciale() {
    try {
        const offreSpeciales = await OffreSpecialeModel.find({}).populate('liste_service').exec();
        const offreSpecialesFormatees = offreSpeciales.map(offre => ({
            ...offre.toObject(),
            date_debut: formatDate(offre.date_debut),
            date_fin: formatDate(offre.date_fin),
        }));
        return offreSpecialesFormatees;
    } catch (erreur) {
        console.error('Erreur lors de l\'obtention de l\'offre spéciale :', erreur.message);
        throw erreur;
    }
}

function formatDate(date) {
    return date.toISOString().split('T')[0]; // Format "yyyy-MM-dd"
}

async function ajouterOffreSpeciale(nouvelleOffre) {
    try {
        const offreSpeciale = new OffreSpecialeModel(nouvelleOffre);
        return await offreSpeciale.save();
    } catch (erreur) {
        console.error('Erreur lors de l\'insertion de l\'offre spéciale :', erreur.message);
        throw erreur;
    }
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
}

async function obtenirOffreSpecialeParId(idOffreSpeciale) {
    try {
        const offreSpeciale = await OffreSpecialeModel.findById(idOffreSpeciale).populate('liste_service');
        return {
            _id: offreSpeciale._id,
            nom: offreSpeciale.nom,
            description: offreSpeciale.description,
            date_debut: formatDate(offreSpeciale.date_debut),
            date_fin: formatDate(offreSpeciale.date_fin),
            liste_service: offreSpeciale.liste_service,
            liste_reduction: offreSpeciale.liste_reduction
        };
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

async function getAllOffreSpeciale(pageNumber, pageSize) {
    try {
        const currentDate = new Date();
        const skip = (pageNumber - 1) * pageSize;
        const offreSpeciales = await OffreSpecialeModel.find({
            date_fin: { $gte: currentDate }
        })
            .populate('liste_service')
            .skip(skip)
            .limit(pageSize);
        return offreSpeciales;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
async function countAllOffreSpecialte() {
    try {
        const currentDate = new Date();
        const count = await OffreSpecialeModel.countDocuments({
            date_fin: { $gte: currentDate }});
        return count;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
module.exports = {
    ajouterOffreSpeciale,
    obtenirOffreSpeciale,
    obtenirOffreSpecialeParId,
    modifierOffreSpeciale,
    supprimerOffreSpeciale,
    getAllOffreSpeciale,
    countAllOffreSpecialte
};
