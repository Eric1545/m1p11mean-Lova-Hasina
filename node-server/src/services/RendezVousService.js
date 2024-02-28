const AccountModel = require("../models/AccountModel");
const RendezVousModel = require("../models/RendezVousModel");
const PanierModel = require("../models/PanierModel");
const { ServiceModel } = require("../models/ServiceModel");
const { envoyerEmail } = require("../utils/mailer");
const { createNotification } = require("./NotificationService");
const mongoose = require("mongoose");
const OffreSpecialeModel = require("../models/OffreSpeciale");
const {obtenirDernierPanierParIdClient} = require("./PanierService");
const {createFacture} = require("./FactureService");


async function terminerRdv(idRdv) {
    try {
        console.log("idRdv = ", idRdv);

        const result = await RendezVousModel.updateOne(
            { _id: idRdv },
            { $set: { completion: true } }
        );

        if (result.nModified === 0) {
            console.log('Rendez vous non trouvé');
            throw new Error('Rendez vous non trouvé');
        }

        const rdv = await  RendezVousModel.find({
            _id: idRdv
        });
        console.log("rdv = ", rdv)
        console.log("rdv = ", rdv[0].client_id)
        console.log("rdv = ", rdv[0].employe_id)
        console.log("rdv = ", rdv[0].services)
        const donnee = {
            client_id: rdv[0].client_id,
            employe_id: rdv[0].employe_id,
            liste_service: rdv[0].services,
            liste_reduction: rdv[0].reductions,
            completion: false
        }
        await createFacture(donnee);
        console.log('Rendez vous terminé avec succès');
        return 'Rendez vous terminé avec succès';
    } catch (erreur) {
        console.error('Erreur lors de la suppression du service dans le panier :', erreur);
        throw erreur;
    }
}

async function nbRdvParJours(mois, annee) {
    try {
        const dernierJourDuMois = new Date(annee, mois, 1);
        dernierJourDuMois.setHours(-1);

        let response = Array.from({ length: dernierJourDuMois.getDate() }, (_, index) => ({ _id: index + 1, count: 0 }));

        const result = await RendezVousModel.aggregate([
            {
                $match: {
                    date_heure: {
                        $gte: new Date(`${annee}-${mois.toString().padStart(2, '0')}-01T00:00:00.000Z`),
                        $lt: new Date(`${annee}-${(mois + 1).toString().padStart(2, '0')}-01T00:00:00.000Z`)
                    }
                }
            },
            {
                $group: {
                    _id: { $dayOfMonth: "$date_heure" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        console.log('Rendez-vous par jour:', result);

        // Mettre à jour les valeurs de count dans la réponse
        result.forEach(item => {
            const index = item._id - 1; // L'index dans le tableau commence à 0
            if (index >= 0 && index < response.length) {
                response[index].count = item.count;
            }
        });

        console.log('Réponse mise à jour:', response);
        return response;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}


async function nbRdvParMois(annee) {
    try {
        const result = await RendezVousModel.aggregate([
            {
                $match: {
                    date_heure: {
                        $gte: new Date(`${annee}-01-01`),
                        $lt: new Date(`${annee + 1}-01-01`)
                    }
                }
            },
            {
                $group: {
                    _id: { $month: "$date_heure" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        const response = Array.from({ length: 12 }, (_, index) => ({
            _id: getNomMois(index + 1),
            count: 0
        }));

        result.forEach(item => {
            const index = item._id - 1;
            if (index >= 0 && index < response.length) {
                response[index].count = item.count;
            }
        });

        console.log('Rendez-vous par mois:', response);
        return response;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

function getNomMois(numeroMois) {
    const mois = new Date(2000, numeroMois - 1, 1).toLocaleString('fr-FR', { month: 'long' });
    return mois.charAt(0).toUpperCase() + mois.slice(1); // Mettez la première lettre en majuscule
}

async function obtenirRdvParEmploye(idEmploye, date) {
    try {
        const debutJournee = new Date(date);
        debutJournee.setHours(0, 0, 0, 0);
        const finJournee = new Date(date);
        finJournee.setHours(23, 59, 59, 999);

        const rendezVous = await RendezVousModel.find({
            employe_id: idEmploye,
            date_heure: {
                $gte: debutJournee,
                $lte: finJournee
            }
        })
            .sort({ date_heure: 1 })
            .populate({ path: 'client_id', model: AccountModel })
            .populate({ path: 'employe_id', model: AccountModel })
            .populate({ path: 'services', model: ServiceModel })
            .exec();

        return rendezVous;
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}

async function obtenirRdvTerminerParEmploye(idEmploye, date) {
    try {
        const debutJournee = new Date(date);
        debutJournee.setHours(0, 0, 0, 0);
        const finJournee = new Date(date);
        finJournee.setHours(23, 59, 59, 999);

        const rendezVous = await RendezVousModel.find({
            employe_id: idEmploye,
            completion: true,
            date_heure: {
                $gte: debutJournee,
                $lte: finJournee
            }
        })
            .sort({ date_heure: 1 })
            .populate({ path: 'client_id', model: AccountModel })
            .populate({ path: 'employe_id', model: AccountModel })
            .populate({ path: 'services', model: ServiceModel })
            .lean()
            .exec();


        const listeTransformee = rendezVous.map((rdv) => {
            // Ajouter prixCommision dans la liste de service
            rdv.services = rdv.services.map((service) => ({
                ...service,
                prixCommission: (service.prix * service.commission) / 100,
            }));

            // Ajouter commissionRdv : somme de prixCommision des services
            rdv.commissionRdv = rdv.services.reduce(
                (total, service) => total + service.prixCommission,
                0
            );

            return rdv;
        });

        // Ajouter commissionTotal : somme de commissionRdv dans la liste
        const commissionTotal = listeTransformee.reduce(
            (total, rdv) => total + rdv.commissionRdv,
            0
        );

        return { rdv: listeTransformee, commissionTotal };
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
}


async function compteNbServiceAuPanier(idClient) {
    try {
        const panier = await PanierModel.find({
            client_id: idClient,
            est_inserer: false
        });
        console.log(panier);
        if (panier.length > 0) {
            return panier[0].services.length;
        }
        return 0;
    } catch (erreur) {
        console.error('Erreur lors de compteNbServiceAuPanier :', erreur.message);
        throw erreur;
    }
}

async function ajouterAuPanier(nouveauPanier) {
    try {
        const panierActuel = await obtenirDernierPanierParIdClient(nouveauPanier.client_id);
        console.log(panierActuel)

        if (panierActuel !== null) {
            panierActuel.services.push(nouveauPanier.services[0]);
            const panierModifie = await PanierModel.findByIdAndUpdate(panierActuel._id, panierActuel, { new: true });
            if (!panierModifie) {
                throw new Error('Service non trouvé');
            }
            return panierModifie;
        }

        const panier = new PanierModel(nouveauPanier);
        return await panier.save();
    } catch (erreur) {
        console.error('Erreur lors de l\'insertion du panier :', erreur.message);
        throw erreur;
    }
}
async function obtenirDureeTotalDernierPanier(idClient) {
    try {
        const resultat = await PanierModel.aggregate([
            // Filtrer les paniers associés au client spécifié
            {
                $match: {
                    client_id: new mongoose.Types.ObjectId(idClient),
                    est_inserer: false
                },
            },
            // Dérouler le tableau des services dans le dernier panier
            {
                $unwind: "$services"
            },
            // Effectuer une jointure avec la collection "services" pour obtenir les détails de chaque service
            {
                $lookup: {
                    from: "services",
                    localField: "services",
                    foreignField: "_id",
                    as: "serviceDetails"
                }
            },
            // Dérouler le tableau des détails de service résultant de la jointure
            {
                $unwind: "$serviceDetails"
            },
            // Grouper les résultats pour calculer la durée totale des services dans le dernier panier
            {
                $group: {
                    _id: {
                        id: "$_id"
                    },
                    totalDuree: { $sum: "$serviceDetails.duree" }
                }
            }
        ]);

        // Vérifier s'il y a des résultats après l'agrégation
        console.log(resultat)
        if (resultat.length > 0) {
            // Retourner la durée totale des services dans le dernier panier du client
            return resultat[0].totalDuree;
        } else {
            // Retourner 0 si le panier est vide
            return 0;
        }
    } catch (erreur) {
        // En cas d'erreur, propager l'erreur pour une gestion ultérieure
        throw erreur;
    }
}


async function obtenirRdvApres(idEmploye, dateDesirer) {
    const dateDebutJournee = new Date(dateDesirer);
    dateDebutJournee.setHours(0, 0, 0, 0);

    const dateFinJournee = new Date(dateDesirer);
    dateFinJournee.setHours(23, 59, 59, 999);
    try {
        return await RendezVousModel.find({
            $and: [
                {
                    date_heure: {
                        $gte: dateDebutJournee,
                        $lte: dateFinJournee
                    },
                },
                {
                    employe_id: idEmploye
                },
                {
                    date_heure: {
                        $gt: dateDesirer,
                    }
                }
            ]
        }).sort({date_heure: 1}).limit(1).exec();
    } catch (erreur) {
        throw erreur;
    }
}

async function obtenirRdvAvant(idEmploye, dateDesirer) {

    const dateDebutJournee = new Date(dateDesirer);
    dateDebutJournee.setHours(0, 0, 0, 0);

    const dateFinJournee = new Date(dateDesirer);
    dateFinJournee.setHours(23, 59, 59, 999);
    try {
        return await RendezVousModel.find({
            $and: [
                {
                    date_heure: {
                        $gte: dateDebutJournee,
                        $lte: dateFinJournee
                    },
                },
                {
                    employe_id: idEmploye
                },
                {
                    date_heure: {
                        $lt: dateDesirer,
                    }
                }
            ]
        }).sort({date_heure: -1}).limit(1).exec();
    } catch (erreur) {
        throw erreur;
    }
}


async function obtenirDureeTotalRDV(idRDV) {
    try {
        const resultat = await RendezVousModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(idRDV)
                },
            },
            {
                $unwind: "$services"
            },
            {
                $lookup: {
                    from: "services",
                    localField: "services",
                    foreignField: "_id",
                    as: "serviceDetails"
                }
            },
            {
                $unwind: "$serviceDetails"
            },
            {
                $group: {
                    _id: {
                        id: "$_id"
                    },
                    totalDuree: { $sum: "$serviceDetails.duree" }
                }
            }
        ]);

        if (resultat.length > 0) {
            return resultat[0].totalDuree;
        } else {
            return 0;
        }

    } catch (erreur) {
        console.error('Erreur lors de l\'obtention de duree total d\'un rdv: ', erreur);
        throw erreur;
    }
}

async function getRendezVous(pageNumber, pageSize, id) {
    try {
        const skip = (pageNumber - 1) * pageSize;
        const rendezVous = await RendezVousModel.find({client_id:id})
            .populate({ path: 'client_id', model: AccountModel })
            .populate({ path: 'employe_id', model: AccountModel })
            .populate({ path: 'services', model: ServiceModel })
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

async function createRendezVous(postData) {
    try {
        const rendezVousModel = new RendezVousModel(postData);
        rendezVousModel.save();
        return 'Données postées traitées avec succès';
    } catch (error) {
        console.error('Error fetching data from database:', error);
        throw error;
    }
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
    findRendezVousById,
    rappelleRendezVous,
    obtenirDureeTotalRDV,
    obtenirRdvAvant,
    obtenirRdvApres,
    obtenirDureeTotalDernierPanier,
    ajouterAuPanier,
    compteNbServiceAuPanier,
    obtenirRdvParEmploye,
    terminerRdv,
    obtenirRdvTerminerParEmploye,
    nbRdvParMois,
    nbRdvParJours
};
