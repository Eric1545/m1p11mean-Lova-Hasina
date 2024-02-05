const { Request, Response } = require('express');
const AccountService = require('../services/AccountService');

class AccountController {
  async getAccount(req, res) {
    try {
      const data = await AccountService.getAccount();
      res.json({ message: 'GET request successful', data });
    } catch (error) {
      console.error('Error in getExample:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async createAccount(req, res) {
    const postData = req.body;
    try {
      const result = await AccountService.createAccount(postData);
      res.json({ message: 'POST request successful', result });
    } catch (error) {
      console.error('Error in postExample:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new AccountController();
