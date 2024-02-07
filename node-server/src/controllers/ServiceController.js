const { getService, createService } = require("../services/ServiceService");


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
}

module.exports = new ServiceController();
