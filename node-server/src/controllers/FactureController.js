const { createFacture, getFactureClient, countFactureClient } = require("../services/FactureService");

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
}
module.exports = new FactureController()