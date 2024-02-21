const NotificationsModel = require("../models/NotificationsModel");

async function createNotification (postData){
    const notificationModel = new NotificationsModel(postData);
    notificationModel.save();
    return 'Données postées traitées avec succès';
}

async function getNotification(idUtilisateur){
    try {
        const notifications = await NotificationsModel.find({utilisateur:idUtilisateur});
        return notifications;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
module.exports = {
    createNotification,
    getNotification
};