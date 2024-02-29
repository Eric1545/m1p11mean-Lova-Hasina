const { createFacture, getFactureClient, countFactureClient, payerFacture, statChiffreAffaireParJour,
    statChiffreAffaireParMois
} = require("../services/FactureService");
const {nbRdvParMois, nbRdvParJours} = require("../services/RendezVousService");

class FactureController {
    createFacture(req, res) {
        const postData = req.body;
        try {
            const result = createFacture(postData);
            const io = req.app.get('socketio');
            io.emit('facture', { message: 'Ceci est un test de socket.io depuis une route.',handle:"zao ihany" });
            res.json({ message: 'POST request successful', result });
        } catch (error) {
            console.error('Error in postExample:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async statChiffreAffaireParJoursMois(req, res) {
        const {mois, annee} = req.body;
        try {
            let reponse = null;
            if (mois === 0) {
                reponse = await statChiffreAffaireParMois(annee, true);
            }
            else {
                reponse = await statChiffreAffaireParJour(mois, annee, true);
            }
            res.json({ message: 'statChiffreAffaireParJoursMois', data: reponse});
        } catch (error) {
            console.error('Error in postExample:', error);
            res.status(500).json({message: 'Internal Server Error'});
        }
    }
    async getFactureClient(req, res) {
        const params = req.params;
        try {
            const data = await getFactureClient(params.pageNumber, params.pageSize, params.idClient);
            const nombreRendezVous = await countFactureClient(params.idClient)
            const nombrePage = Math.ceil(nombreRendezVous / params.pageSize)
            res.json({ message: 'GET request successful', data, nombrePage });
        } catch (error) {
            console.error('Error in getService:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async payerFacture(req, res) {
        const { idFacture } = req.params;
        try {
            const data = await payerFacture(idFacture);
            res.json({ message: 'Facture payée avec succès', data });
        } catch (error) {
            console.error('Erreur dans payerFacture:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
module.exports = new FactureController()