import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class OffreSpecialeService {

  private apiUrl = environment.host + '/offre_speciale';

  async ajouterOffreSpeciale(nouvelleOffreSpeciale: any) {
    try {
      const response = await axios.post(this.apiUrl, nouvelleOffreSpeciale);
      return response.data;
    } catch (erreur) {
      throw erreur;
    }
  }

  async obtenirOffreSpeciales() {
    try {
      return await axios.get(this.apiUrl);
    } catch (erreur) {
      throw erreur;
    }
  }

  async obtenirOffreSpecialeParId(id: any) {
    try {
      return await axios.get(`${this.apiUrl}/${id}`);
    } catch (erreur) {
      throw erreur;
    }
  }

  async supprimerOffreSpeciale(id: any): Promise<any> {
    try {
      const response = await axios.delete(`${this.apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async mettreAJourOffreSpeciale(offreSpecialeModifie: any): Promise<any> {
    try {
      const response = await axios.put(`${this.apiUrl}/${offreSpecialeModifie._id}`, offreSpecialeModifie);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  async getAlloffreSpeciale(pageNumber:number,pageSize:number){
    return await axios.get(`${this.apiUrl}/getAllOffreService/${pageNumber}/${pageSize}`)
  }
}
