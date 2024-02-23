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
      return await axios.post(this.apiUrl, nouvelleOffreSpeciale);
    } catch (erreur) {
      throw erreur;
    }
  }

}
