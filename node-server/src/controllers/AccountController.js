const { Request, Response } = require('express');
const AccountService = require('../services/AccountService');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

class AccountController {
  async getAccount(req, res) {
    try {
      const data = await AccountService.getAccount();
      res.json({ message: 'GET request successful', data });
    } catch (error) {
      console.error('Error in getAccount:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async createAccount(req, res) {
    const postData = req.body;
    try {
      const result = await AccountService.createAccount(postData);
      res.json({ message: 'POST request successful', result });
    } catch (error) {
      console.error('Error in postAccount:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async addFavoris(req, res){
    const {idUtilisateur,idFavoris} = req.params;
    try{
      const result = await AccountService.addFavoris(idUtilisateur,idFavoris);
      res.json({ message: 'POST request successful', result });
    } catch (error){
      console.error('error')
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async removeFavoris(req, res){
    const {idUtilisateur,idFavoris} = req.params;
    try{
      const result = await AccountService.removeFavoris(idUtilisateur,idFavoris);
      res.json({ message: 'POST request successful', result });
    } catch (error){
      console.error('error')
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  
  async login(req, res){
    const postData = req.body;
    try{
      const result = await AccountService.login(postData.username,postData.password);
      console.log(result)
      if (result.length >0){
        const {username} = postData
        const token = jwt.sign({username},config.privateKey)
        res.json({ login: true,token });
      } else{
        res.json({ login:false });
      }
    } catch (error){
      console.error('error',error)
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async sendMail (req, res){
    const postData = req.body;
    try{
      const result = await AccountService.sendMailToUser(postData.destinataire,postData.sujet,postData.contenu);
      res.json({ message: 'POST request successful', result });
    } catch (error){
      console.error('error')
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

module.exports = new AccountController();
