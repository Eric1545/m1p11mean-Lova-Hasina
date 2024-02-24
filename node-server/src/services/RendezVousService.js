const AccountModel = require("../models/AccountModel");
const RendezVousModel = require("../models/RendezVousModel");
const { ServiceModel } = require("../models/ServiceModel");
const { envoyerEmail } = require("../utils/mailer");
const { createNotification } = require("./NotificationService");

async function getRendezVous(pageNumber, pageSize, id) {
    try {
        const skip = (pageNumber - 1) * pageSize;
        const rendezVous = await RendezVousModel.find({client_id:id})
            .populate({ path: 'client_id', model: AccountModel })
            .populate({ path: 'employe_id', model: AccountModel })
            .populate({ path: 'service_id', model: ServiceModel })
            .skip(skip)
            .limit(pageSize);
        return rendezVous;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
async function count(id){
    try {
        const count = await RendezVousModel.countDocuments({client_id:id});
        return count;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
function createRendezVous(postData) {
    const rendezVousModel = new RendezVousModel(postData);
    rendezVousModel.save();
    return 'Données postées traitées avec succès';
}
async function findRendezVousById(id) {
    try {
        const rendezVous = await RendezVousModel.findById(id)
        .populate({ path: 'client_id', model: AccountModel })
        .populate({ path: 'employe_id', model: AccountModel })
        .populate({ path: 'service_id', model: ServiceModel })
        return rendezVous;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
async function rappelleRendezVous(){
    console.log('rappel')
    const date = new Date();
    const deuxJoursPlusTard = new Date(date.getTime() + (3 * 24 * 60 * 60 * 1000));
    const rendezVous = await RendezVousModel.find({
        date_heure:{
            $gte:date,
            $lte: deuxJoursPlusTard, 
        },
        completion: false
    }).populate({ path: 'client_id', model: AccountModel })
    console.log(rendezVous.length)
    for (const rendezVousItem of rendezVous) {
        const date_insertion = new Date(rendezVousItem.date_heure);
        createNotification({
            nom: `Rappel de rendez-vous pour le ${date_insertion.toLocaleDateString('fr-FR')} à ${date_insertion.toLocaleTimeString()}`,
            utilisateur: rendezVousItem.client_id,
            type: "rappel",
            id: rendezVousItem._id,
        });

        envoyerEmail(rendezVousItem.client_id.email, "Rappel de rendez-vous", `Vous avez un rendez-vous pour le ${date_insertion.toLocaleDateString('fr-FR')} à ${date_insertion.toLocaleTimeString()} !`);
    }
    
    return rendezVous;
}
module.exports = {
    getRendezVous,
    count,
    createRendezVous,
    rappelleRendezVous,
    findRendezVousById
};
