const AccountModel = require("../models/AccountModel");
const NotificationsModel = require("../models/NotificationsModel");
const RoleModel = require("../models/RoleModel");

async function createNotification(postData) {
    const notificationModel = new NotificationsModel(postData);
    notificationModel.save();
    return 'Données postées traitées avec succès';
}
async function createNotificationOffreSpeciale(offreSpeciale) {
    try {
        const role = await RoleModel.findOne({ role: 'client' });
        const users = await AccountModel.find({role: role._id});
        const postDataArray = users.map(user => ({
            nom: `Offre spéciale pour vous !`,
            utilisateur: user._id,
            type: "offre",
            id: offreSpeciale._id,
        }));
        const result = await NotificationsModel.insertMany(postDataArray);
        return result;
    } catch (error) {
        throw new Error(`Erreur lors de la création des notifications : ${error.message}`);
    }
}
async function getNotification(idUtilisateur) {
    try {
        const notifications = await NotificationsModel.find({ utilisateur: idUtilisateur })
            .sort({ date_insertion: -1 });
        return notifications;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
async function countNotification(idUtilisateur) {
    try {
        const notifications = await NotificationsModel.countDocuments({ utilisateur: idUtilisateur, lu: false })
        return notifications
    }
    catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
async function updateReadNotification(idNotification) {
    try {
        const notification = await NotificationsModel.findOneAndUpdate({ _id: idNotification }, { lu: true }, {
            new: true
        });
        return notification
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

module.exports = {
    createNotification,
    getNotification,
    updateReadNotification,
    countNotification,
    createNotificationOffreSpeciale
};