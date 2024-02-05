// src/controllers/exampleController.js
const { Request, Response } = require('express');
const ExampleService = require('../services/ExampleService');

class ExampleController {
  async getExample(req, res) {
    try {
      const data = await ExampleService.getData();
      res.json({ message: 'GET request successful', data });
    } catch (error) {
      console.error('Error in getExample:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  postExample(req, res) {
    const postData = req.body;
    try {
      const result = ExampleService.processPostData(postData);
      res.json({ message: 'POST request successful', result });
    } catch (error) {
      console.error('Error in postExample:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new ExampleController();
