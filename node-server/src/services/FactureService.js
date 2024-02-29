const AccountModel = require("../models/AccountModel");
const FactureModel = require("../models/FactureModel");
const { ServiceModel } = require("../models/ServiceModel");

async function statChiffreAffaireParJour(mois, annee, reductionCompris) {
    try {
        const chiffreAffaires = await chiffreAffaireParJour(mois, annee);
        if (reductionCompris) {
            const reductions = await reductionChiffreAffaireParJour(mois, annee);
            for (let i = 0; i < chiffreAffaires.length; i++) {
                chiffreAffaires[i].chiffre_affaire -= reductions[i].reduction;
            }
        }
        return chiffreAffaires;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

async function statChiffreAffaireParMois(annee, reductionCompris) {
    try {
        const chiffreAffaires = await chiffreAffaireParMois(annee);
        if (reductionCompris) {
            const reductions = await reductionChiffreAffaireParMois(annee);
            for (let i = 0; i < chiffreAffaires.length; i++) {
                chiffreAffaires[i].chiffre_affaire -= reductions[i].reduction;
            }
        }
        return chiffreAffaires;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

async function reductionChiffreAffaireParJour(mois, annee) {
    try {
        const dernierJourDuMois = new Date(annee, mois, 1);
        dernierJourDuMois.setHours(-1);

        let response = Array.from({ length: dernierJourDuMois.getDate() }, (_, index) => ({ _id: index + 1, reduction: 0 }));

        const result = await FactureModel.find({
            date_insertion: {
                $gte: new Date(`${annee}-${mois.toString().padStart(2, '0')}-01T00:00:00.000Z`),
                $lt: new Date(`${annee}-${(mois + 1).toString().padStart(2, '0')}-01T00:00:00.000Z`)
            },
            completion: true
        }).populate({ path: 'liste_service', model: ServiceModel });

        for (let facture of result) {
            const services = facture.liste_service;
            const reductions = facture.liste_reduction;
            const dateFacture = new Date(facture.date_insertion);
            let red = 0;
            if (reductions.length !== 0) {
                for (let i = 0; i < services.length; i++) {
                    red += (services[i].prix * reductions[i]) / 100;
                }
            }
            response[dateFacture.getDate() - 1].reduction = red;
        }
        return response;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

async function reductionChiffreAffaireParMois(annee) {
    try {
        let response = Array.from({ length: 12 }, (_, index) => ({ _id: index + 1, reduction: 0 }));

        const result = await FactureModel.find({
            date_insertion: {
                $gte: new Date(`${annee}-01-01`),
                $lt: new Date(`${annee + 1}-01-01`)
            },
            completion: true
        }).populate({ path: 'liste_service', model: ServiceModel });

        for (let facture of result) {
            const services = facture.liste_service;
            const reductions = facture.liste_reduction;
            const dateFacture = new Date(facture.date_insertion);
            let red = 0;
            if (reductions.length !== 0) {
                for (let i = 0; i < services.length; i++) {
                    red += (services[i].prix * reductions[i]) / 100;
                }
            }
            response[dateFacture.getMonth()].reduction += red;
        }
        return response;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}


function getNomMois1(numeroMois) {
    const mois = new Date(2000, numeroMois - 1, 1).toLocaleString('fr-FR', { month: 'long' });
    return mois.charAt(0).toUpperCase() + mois.slice(1); // Mettez la première lettre en majuscule
}

async function chiffreAffaireParMois(annee) {
    try {
        let response = Array.from({ length: 12 }, (_, index) => ({ _id: getNomMois1(index + 1), chiffre_affaire: 0 }));

        const result = await FactureModel.aggregate([
            {
                $match: {
                    date_insertion: {
                        $gte: new Date(`${annee}-01-01`),
                        $lt: new Date(`${annee + 1}-01-01`)
                    },
                    completion: true
                }
            },
            {
                $lookup: {
                    from: "services", // Nom de la collection des services
                    localField: "liste_service",
                    foreignField: "_id",
                    as: "service"
                }
            },
            {
                $unwind: "$service"
            },
            {
                $group: {
                    _id: { $month: "$date_insertion" },
                    chiffre_affaire: {
                        $sum: "$service.prix"
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Mettre à jour les valeurs de chiffre_affaire dans la réponse
        result.forEach(item => {
            const index = item._id - 1; // L'index dans le tableau commence à 0
            if (index >= 0 && index < response.length) {
                response[index].chiffre_affaire = item.chiffre_affaire;
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

async function chiffreAffaireParJour(mois, annee) {
    try {
        const dernierJourDuMois = new Date(annee, mois, 1);
        dernierJourDuMois.setHours(-1);

        let response = Array.from({ length: dernierJourDuMois.getDate() }, (_, index) => ({ _id: index + 1, chiffre_affaire: 0 }));

        const result = await FactureModel.aggregate([
            {
                $match: {
                    date_insertion: {
                        $gte: new Date(`${annee}-${mois.toString().padStart(2, '0')}-01T00:00:00.000Z`),
                        $lt: new Date(`${annee}-${(mois + 1).toString().padStart(2, '0')}-01T00:00:00.000Z`)
                    },
                    completion: true
                }
            },
            {
                $lookup: {
                    from: "services", // Nom de la collection des services
                    localField: "liste_service",
                    foreignField: "_id",
                    as: "service"
                }
            },
            {
                $unwind: "$service"
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$date_insertion" },
                    chiffre_affaire: {
                        $sum: "$service.prix"
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        console.log('Chiffre affaire par jour avec réduction:', result);

        // Mettre à jour les valeurs de chiffre_affaire dans la réponse
        result.forEach(item => {
            const index = item._id - 1; // L'index dans le tableau commence à 0
            if (index >= 0 && index < response.length) {
                response[index].chiffre_affaire = item.chiffre_affaire;
            }
        });

        return response;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

async function getFactureClient(pageNumber, pageSize, idClient) {
    try {
        const skip = (pageNumber - 1) * pageSize;
        const rendezVous = await FactureModel.find({ client_id: idClient })
            .populate({ path: 'client_id', model: AccountModel })
            .populate({ path: 'employe_id', model: AccountModel })
            .populate({ path: 'liste_service', model: ServiceModel })
            .skip(skip)
            .limit(pageSize);
        return rendezVous;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
async function countFactureClient(idClient) {
    try {
        const rendezVous = await FactureModel.countDocuments({ client_id: idClient })
        return rendezVous;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
async function payerFacture(idFacture){
    try {
        const facture = await FactureModel.findOneAndUpdate({_id:idFacture},{completion:true});
        return facture;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}
async function createFacture(postData) {
    const factureModel = new FactureModel(postData);
    factureModel.save();
    return 'Données postées traitées avec succès';
}
module.exports = {
    getFactureClient,
    createFacture,
    countFactureClient,
    payerFacture,
    statChiffreAffaireParJour,
    statChiffreAffaireParMois
}