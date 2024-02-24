const OffreSpecialeService = require('../services/OffreSpecialeService');
const { createNotificationOffreSpeciale } = require('../services/NotificationService');

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
            await createNotificationOffreSpeciale(resultat);
            const io = req.app.get('socketio');
            io.emit('notification', { message: 'Ceci est un test de socket.io depuis une route.',handle:"zao ihany" });
            res.status(201).json({ message: 'Offre spéciale ajoutée avec succès', resultat });
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'offre spéciale :', error);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    }

    async obtenirOffreSpeciale(req, res) {
        try {
            const data = await OffreSpecialeService.obtenirOffreSpeciale();
            // console.log("data : ", data)
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
    async getAllOffreSpeciale(req, res) {
        const params = req.params;
        try {
            const data = await OffreSpecialeService.getAllOffreSpeciale(params.pageNumber,params.pageSize);
            const nombreOffreSpeciale = await OffreSpecialeService.countAllOffreSpecialte()
            const nombrePage = Math.ceil(nombreOffreSpeciale/params.pageSize)
            res.json({ message: 'GET request successful', data, nombrePage });
        } catch (erreur) {
            console.error('Erreur lors de la suppression du service :', erreur);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}

module.exports = new OffreSpecialeController();
