const { createNotification, getNotification } = require("../services/NotificationService");

class NotificationsController {
    async createNotification(req,res){
        const postData = req.body;
        try {
            const result = await createNotification(postData);
            res.json({ message: 'POST request successful', result });
        } catch (error) {
            console.error('Error in postNotification:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
    async getNotification(req,res){
        const idUtilisateur = req.params.idUtilisateur;
        try {
            const result = await getNotification(idUtilisateur);
            res.json({ message: 'GET request successful', result });
        } catch (error) {
            console.error('Error in getNotification:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
module.exports = new NotificationsController();