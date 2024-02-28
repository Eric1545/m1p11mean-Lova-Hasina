const { Request, Response } = require('express');
const AccountService = require('../services/AccountService');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { createToken } = require('../middleware/auth');
const {supprimerEmploye, obtenirCompteParId} = require("../services/AccountService");

class AccountController {

  async obtenirCompteParId(req, res) {
    const id = req.params;
    try {
      const data = await obtenirCompteParId(id);
      res.json({ message: 'GET request successful', data });
    } catch (erreur) {
      console.error('Erreur lors de la suppression du service :', erreur);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async supprimerEmploye(req, res) {
    const id = req.params;
    try {
      const messageSuppression = await supprimerEmploye(id);
      res.json({ message: messageSuppression });
    } catch (erreur) {
      console.error('Erreur lors de la suppression du service :', erreur);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async modifierEmploye(req, res) {
    const compteModifier = req.body;
    const params = req.params;
    try {
      const resultat = await AccountService.modifierEmploye(params.id, compteModifier);
      res.json({ message: 'Employe modifié avec succès', resultat });
    } catch (error) {
      console.error('Erreur lors de la modification du service:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async obtenirCompteParRole(req, res) {
    const params = req.params;
    console.log(params)
    console.log(params.role)
    try {
      const data = await AccountService.obtenirCompteParRole(params.role);
      res.json({ message: 'GET request successful', data });
    } catch (error) {
      console.error('Erreur dans obtenirCompteParRole:', error);
      res.status(500).json({ message: 'Erreur du serveur interne!' });
    }
  }

  async getAccount(req, res) {
    const params = req.params;
    try {
      const data = await AccountService.getAccount(params.pageNumber,params.pageSize);
      const nombreCompte = await AccountService.count()
      const nombrePage = Math.ceil(nombreCompte/params.pageSize)
      res.json({ message: 'GET request successful', data, nombrePage});
    } catch (error) {
      console.error('Error in getAccount:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async getUserById(req, res) {
    const params = req.params;
    try {
      const data = await AccountService.getUserById(params.id);
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
      res.json({ message: 'Compte ajouter avec succès', result });
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
  async addServiceFavoris(req, res){
    const {idUtilisateur,idFavoris} = req.params;
    try{
      const result = await AccountService.addServiceFavoris(idUtilisateur,idFavoris);
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
  async removeServiceFavoris(req, res){
    const {idUtilisateur,idFavoris} = req.params;
    try{
      const result = await AccountService.removeServiceFavoris(idUtilisateur,idFavoris);
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
        const token = createToken(username)
        res.json({ login: true,token,id: result[0]._id,role:result[0].role.role });
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
  async sendMailForgotMdp(req, res){
    const postData = req.body
    try{
      const result = await AccountService.sendMailForgotMdp(postData.email);
      res.json({ message: 'POST request successful', result });
    } catch(error){
      console.error('error')
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
  async reinitilaserMdp(req, res){
    const postData = req.body
    try{
      const result = await AccountService.reinitilaserMdp(req.username,postData.mdp);
      res.json({ message: 'POST request successful', result });
    } catch(error){
      console.error('error')
      res.status(500).json({ message : 'Internal Server Error' });
    }
  }
}

module.exports = new AccountController();
