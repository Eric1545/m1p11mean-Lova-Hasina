const AccountModel = require("../models/AccountModel");
const FactureModel = require("../models/FactureModel");
const { ServiceModel } = require("../models/ServiceModel");
const { obtenirCompteParRole } = require("./AccountService");

async function tempsMoyenTravailEmploye() {
    try {
        const dateTotal = []
        const employe = await obtenirCompteParRole('employe');
        const totalTempsEmploye=[]
        for (const element of employe) {
            const factures = await FactureModel.find({ employe_id: element._id, completion: true }).populate({ path: 'liste_service', model: ServiceModel })
            let totalTempsTravail = 0;
            factures.forEach(facture => {
                facture.liste_service.forEach(service => {
                    totalTempsTravail += service.duree;
                });

                const dateSansHeure = new Date(facture.date_insertion);
                dateSansHeure.setHours(0, 0, 0, 0);
                if (!dateTotal.some(date => date.getTime() === dateSansHeure.getTime())) {
                    dateTotal.push(dateSansHeure);
                }
            });
            
            totalTempsEmploye.push({nom:element.nom + " "+element.prenom,temps:totalTempsTravail})
        }

        const tempsMoyenTravailEmploye = totalTempsEmploye.map(employe=>{
            return {nom:employe.nom,temps:employe.temps/dateTotal.length}
        })
        console.log("totalTemps", totalTempsEmploye)
        console.log("totalDate", dateTotal.length)
        return tempsMoyenTravailEmploye;
    } catch (error) {
        console.error("Erreur lors du calcul du temps moyen de travail de l'employé :", error);
        throw error;
    }
}



module.exports = {
    tempsMoyenTravailEmploye
}