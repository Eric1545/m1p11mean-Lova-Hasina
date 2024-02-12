const { getRole } = require("../services/RoleService");

class RoleController {
  async getRole(req, res) {
    try {
      const data = await getRole();
      res.json({ message: 'GET request successful', data });
    } catch (error) {
      console.error('Error in getService:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new RoleController();
