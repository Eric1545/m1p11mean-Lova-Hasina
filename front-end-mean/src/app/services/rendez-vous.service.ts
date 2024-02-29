import { Injectable } from '@angular/core';
import axios from 'axios';
import {environment} from "../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  url = environment.host;
  private apiUrl = environment.host + '/rendezVous';

  constructor(private auth: AuthService) { }

  async obtenirRdvTerminerParEmploye(date: any) {
    try {
      const donnee = {
        idEmploye: this.auth.getId(),
        date: date
      }
      const reponse = await axios.post(`${this.apiUrl}/rdvTerminerParEmploye`, donnee);
      return reponse.data;
    } catch (erreur) {
      throw erreur;
    }
  }

  async terminerRdv(idRdv: any) {
    try {
      const reponse = await axios.get(`${this.apiUrl}/terminerRdv/${idRdv}`);
      return reponse.data;
    } catch (erreur) {
      throw erreur;
    }
  }

  async obtenirRdvParEmploye(date: any) {
    try {
      const donnee = {
        idEmploye: this.auth.getId(),
        date: date
      }
      const reponse = await axios.post(`${this.apiUrl}/rdvParEmploye`, donnee);
      return reponse.data;
    } catch (erreur) {
      throw erreur;
    }
  }

  async supprimerServiceAuPanier(idService: any) {
    try {
      const panier = {
        clientId: this.auth.getId(),
        serviceId: idService
      }
      const reponse = await axios.post(`${this.apiUrl}/supprimerServiceAuPanier`, panier);
      return reponse.data;
    } catch (erreur) {
      throw erreur;
    }
  }

  async ajouterAuPanier(nouveauService: any) {
    try {
      nouveauService.client_id = this.auth.getId();
      return await axios.post(`${this.apiUrl}/ajouterPanier`, nouveauService);
    } catch (erreur) {
      throw erreur;
    }
  }

  async ajouterRdv(nouveauRdv: any) {
    try {
      nouveauRdv.client_id = this.auth.getId();
      const rdvAjouter = await axios.post(`${this.apiUrl}`, nouveauRdv);
      return rdvAjouter.data;
    } catch (erreur) {
      throw erreur;
    }
  }

  getRendezVous(id: string,pageNumber: number,pageSize:number){
    return axios.get(`${this.url}/rendezVous/getRendezVous/${id}/${pageNumber}/${pageSize}`)
  }

  compteNbServiceAuPanier(){
    return axios.get(`${this.apiUrl}/nbServiceAuPanier/${this.auth.getId()}`)
  }

  async obtenirDernierPanierParIdClient(): Promise<any[]>  {
    try {
      const response = await axios.get(`${this.apiUrl}/obtenirDernierPanierParIdClient/${this.auth.getId()}`);
      return response.data.data.services;
    } catch (error) {
      throw error;
    }
  }



  getRendezVousById(id: string){
    return axios.get(`${this.url}/rendezVous/${id}`)
  }
}
