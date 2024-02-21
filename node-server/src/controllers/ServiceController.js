const { getService, createService, modifierService, supprimerService, obtenirServiceParId} = require("../services/ServiceService");


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

  async createService(req, res) {
    const postData = req.body;
    try {
      const result = await createService(postData);
      res.json({ message: 'POST request successful', result });
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
