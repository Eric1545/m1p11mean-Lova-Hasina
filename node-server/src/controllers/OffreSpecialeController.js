const { Request, Response } = require('express');
const OffreSpecialeService = require('../services/OffreSpecialeService');

class OffreSpecialeController {

    /*async obtenirOffreSpeciale(req, res) {
        try {
            const data = await OffreSpecialeService.getData();
            res.json({ message: 'GET request successful', data });
        } catch (error) {
            console.error('Error in getExample:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }*/

    async ajouterOffreSpeciale(req, res) {
        try {
            const nouveauOS = req.body;
            const result = await OffreSpecialeService.ajouterOffreSpeciale(nouveauOS);
            res.status(201).json({ message: 'Offre spéciale ajoutée avec succès', result });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'offre spéciale :', error);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    }
}

module.exports = new OffreSpecialeController();
