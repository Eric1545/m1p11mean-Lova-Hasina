const { getRendezVous,createRendezVous, count, obtenirDureeTotalRDV, obtenirRdvAvant, obtenirRdvApres, obtenirDureeTotalPanier, ajouterAuPanier,
  obtenirDureeTotalDernierPanier,
  compteNbServiceAuPanier
} = require("../services/RendezVousService");
const {estDansSonHoraireDeTravail, obtenirCompteParId} = require("../services/AccountService");
const {obtenirPanierParId, obtenirDernierPanierParIdClient, obtenirDernierPanierObjetParIdClient,
  supprimerServiceAuPanier, modifierPanierParId
} = require("../services/PanierService");

class RendezVousController {

  async obtenirDernierPanierParIdClient(req, res) {
    const { idClient } = req.params;
    try {
      const data = await obtenirDernierPanierObjetParIdClient(idClient);
      res.json({ message: 'Dernier panier obtenu avec succes', data});
    } catch (error) {
      console.error('Erreur dans obtenirDernierPanierParIdClient:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async supprimerServiceAuPanier(req, res) {
    const { clientId, serviceId }  = req.body;
    try {
      const data = await supprimerServiceAuPanier(clientId, serviceId);
      res.json({ message: 'Dernier panier obtenu avec succes', data});
    } catch (error) {
      console.error('Erreur dans supprimerServiceAuPanier:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async compteNbServiceAuPanier(req, res) {
    try {
      const { idClient } = req.params;
      const nombreDeServices = await compteNbServiceAuPanier(idClient);
      res.json({
        nombreDeServices
      });
    } catch (error) {
      console.error('Error in obtenirDureeTotalRDV:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async ajouterAuPanier(req, res) {
    try {
      const nouveauPanier = await ajouterAuPanier(req.body);
      res.json({
        message: 'GET request successful',
        nouveauPanier
      });
    } catch (error) {
      console.error('Error in obtenirDureeTotalRDV:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getRendezVous(req, res) {
    const params = req.params;
    try {
      const data = await getRendezVous(params.pageNumber,params.pageSize,params.id);
      const nombreRendezVous = await count(params.id)
      const nombrePage = Math.ceil(nombreRendezVous/params.pageSize)
      res.json({ message: 'GET request successful', data, nombrePage});
    } catch (error) {
      console.error('Error in getService:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async createRendezVous(req, res) {
    try {
      const body = req.body
      const {employe_id, date_heure, client_id} = req.body;
      console.log("body = ", body)
      console.log("employe_id = ", employe_id)
      console.log("date_heure = ", date_heure)
      console.log("client_id = ", client_id)
      const n = null
      const employe = await obtenirCompteParId(employe_id)

      console.log("employe rdvController", employe)
      const dateHeure = new Date(date_heure);
      const dureeRdv = await obtenirDureeTotalDernierPanier(client_id);

      if (await estDansSonHoraireDeTravail(employe, dateHeure, dureeRdv)) {
        const tabRdvAvant = await obtenirRdvAvant(employe_id, dateHeure);
        const rdvAvant = (await tabRdvAvant).length > 0 ? tabRdvAvant[0] : null;
        if (rdvAvant !== null) {
          const dureeRdvAvant = await obtenirDureeTotalRDV(rdvAvant._id);
          const HMRdvAvant = rdvAvant.date_heure.getHours() * 60 + rdvAvant.date_heure.getMinutes() + dureeRdvAvant;
          const HMNouveauRdv = dateHeure.getHours() * 60 + dateHeure.getMinutes();
          if (HMRdvAvant >= HMNouveauRdv) {
            return res.json({message: 'Y a encore un rdv avant', rendezVous: n});
          }
        }
        const tabRdvApres = await obtenirRdvApres(employe_id, dateHeure);
        const rdvApres = (await tabRdvApres).length > 0 ? tabRdvApres[0] : null;
        if (rdvApres !== null) {
          const dureeRdvApres = await obtenirDureeTotalRDV(rdvApres._id);
          const HMRdvApres = rdvApres.date_heure.getHours() * 60 + rdvApres.date_heure.getMinutes();
          const HMFinNouveauRdv = dateHeure.getHours() * 60 + dateHeure.getMinutes() + dureeRdvApres;
          if (HMFinNouveauRdv >= HMRdvApres) {
            return res.json({message: 'Y a encore un rdv apres', rendezVous: n});
          }
        }

        body.completion = false;
        const tabPanier = await obtenirDernierPanierParIdClient(client_id);
        body.services = tabPanier.services;
        console.log("body.services: ", tabPanier)
        const rendezVous = await createRendezVous(body);
        console.log("tabPanier[0] = ", tabPanier)
        await modifierPanierParId(tabPanier._id);
        console.log("rendezVous: ", rendezVous)
        return res.json({message: 'POST request successful', rendezVous: rendezVous});
      }
      console.log('Pas dans son horaire')
      return res.json({message: 'Pas dans son horaire', rendezVous: n});

    } catch (error) {
      console.error('Error in getService:', error);
      res.status(500).json({message: 'Internal Server Error'});
    }
  }
}

module.exports = new RendezVousController();
