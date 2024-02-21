const { createNotification, getNotification, updateReadNotification } = require("../services/NotificationService");

class NotificationsController {
    async createNotification(req,res){
        const postData = req.body;
        try {
            const result = await createNotification(postData);
            const io = req.app.get('socketio');
            io.emit('notification', { message: 'Ceci est un test de socket.io depuis une route.',handle:"zao ihany" });
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
    async updateReadNotification(req,res){
        const idNotification = req.params.idNotification;
        try {
            const result = await updateReadNotification(idNotification);
            res.json({ message: 'GET request successful', result });
        } catch (error) {
            console.error('Error in getNotification:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}
module.exports = new NotificationsController();