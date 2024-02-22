const NotificationsModel = require("../models/NotificationsModel");

async function createNotification (postData){
    const notificationModel = new NotificationsModel(postData);
    notificationModel.save();
    return 'Données postées traitées avec succès';
}

async function getNotification(idUtilisateur){
    try {
        const notifications = await NotificationsModel.find({utilisateur:idUtilisateur})
        .sort({ date_insertion: -1 });
        return notifications;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
async function countNotification(idUtilisateur){
    try {
        const notifications = await NotificationsModel.countDocuments({utilisateur:idUtilisateur,lu:false})
        return notifications
    }
    catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
async function updateReadNotification(idNotification){
    try{
        const notification = await NotificationsModel.findOneAndUpdate({_id:idNotification}, {lu:true}, {
          new: true
        });
        return notification
    }catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

module.exports = {
    createNotification,
    getNotification,
    updateReadNotification,
    countNotification
};