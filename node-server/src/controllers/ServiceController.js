const { getService, createService, modifierService, supprimerService, obtenirServiceParId} = require("../services/ServiceService");
const {obtenirDernierPanierParIdClient} = require("../services/PanierService");


class ServiceController {
  async getService(req, res) {
    try {
      const data = await getService();
      res.json({ message: 'GET request successful', data });
    } catch (error) {
      console.error('Error in getService:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async obtenirServicePanier(req, res) {
    try {
      const { idClient } = req.params;
      const data = await getService();

      const panier = await obtenirDernierPanierParIdClient(idClient);

      const dataAvecEstAuPanier = data.map(service => ({
        _id: service._id,
        nom: service.nom,
        prix: service.prix,
        duree: service.duree,
        commission: service.commission,
        estAuPanier: panier ? (panier.services.includes(service._id) || false) : false,
        image: service.image
      }));

      return res.json({ message: 'GET request successful', data: dataAvecEstAuPanier });
    } catch (error) {
      console.error('Error in obtenirServicePanier:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }



  async createService(req, res) {
    const postData = req.body;
    try {
      const result = await createService(postData);
      res.json({ message: 'Service ajouter avec succès', result });
    } catch (error) {
      console.error('Error in postService:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async modifierService(req, res) {
    const id = req.params;
    const donneesModifiees = req.body;

    try {
      const serviceModifie = await modifierService(id, donneesModifiees);
      res.json({ message: 'Service modifié avec succès', serviceModifie });
    } catch (erreur) {
      console.error('Erreur lors de la modification du service :', erreur);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async supprimerService(req, res) {
    const id = req.params;
    try {
      const messageSuppression = await supprimerService(id);
      res.json({ message: messageSuppression });
    } catch (erreur) {
      console.error('Erreur lors de la suppression du service :', erreur);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async obtenirServiceParId(req, res) {
    const id = req.params;
    try {
      const data = await obtenirServiceParId(id);
      res.json({ message: 'GET request successful', data });
    } catch (erreur) {
      console.error('Erreur lors de la suppression du service :', erreur);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

}

module.exports = new ServiceController();
