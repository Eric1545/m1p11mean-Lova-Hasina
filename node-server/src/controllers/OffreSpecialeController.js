const { Request, Response } = require('express');
const OffreSpecialeService = require('../services/OffreSpecialeService');

class OffreSpecialeController {

    async supprimerOffreSpeciale(req, res) {
        const { id } = req.params;
        try {
            const messageSuppression = await OffreSpecialeService.supprimerOffreSpeciale(id);
            res.json({ message: messageSuppression });
        } catch (erreur) {
            console.error('Erreur lors de la suppression de l\'offre speciale :', erreur);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async modifierOffreSpeciale(req, res) {
        const { id } = req.params;
        const donneesModifiees = req.body;

        try {
            console.log(id)
            const offreSpecialeModifie = await OffreSpecialeService.modifierOffreSpeciale(id, donneesModifiees);
            res.json({ message: 'Offre speciale modifié avec succès', offreSpecialeModifie });
        } catch (erreur) {
            console.error('Erreur lors de la modification de l\'offre speciale :', erreur);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async ajouterOffreSpeciale(req, res) {
        try {
            const nouveauOS = req.body;
            const resultat = await OffreSpecialeService.ajouterOffreSpeciale(nouveauOS);
            res.status(201).json({ message: 'Offre spéciale ajoutée avec succès', resultat });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'offre spéciale :', error);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    }

    async obtenirOffreSpeciale(req, res) {
        try {
            const data = await OffreSpecialeService.obtenirOffreSpeciale();
            console.log("data : ", data)
            res.json({ message: 'Offre speciale obtenue avec succes', data });
        } catch (error) {
            console.error('Error in getExample:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }

    async obtenirOffreSpecialeParId(req, res) {
        const { id } = req.params;
        try {
            const data = await OffreSpecialeService.obtenirOffreSpecialeParId(id);
            res.json({ message: 'GET request successful', data });
        } catch (erreur) {
            console.error('Erreur lors de la suppression du service :', erreur);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new OffreSpecialeController();
