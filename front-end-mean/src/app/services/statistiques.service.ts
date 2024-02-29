import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {
  private apiUrl = environment.host;

  async nbRdvParJoursMois(donnee: any) {
    try {
      const reponse = await axios.post(`${this.apiUrl}/rendezVous/nbRdvParJoursMois`, donnee);
      return reponse.data;
    } catch (erreur) {
      throw erreur;
    }
  }

  async chiffreAffaireJoursMois(donnee: any) {
    try {
      const reponse = await axios.post(`${this.apiUrl}/facture/statChiffreAffaireParJoursMois`, donnee);
      return reponse.data;
    } catch (erreur) {
      throw erreur;
    }
  }
}
