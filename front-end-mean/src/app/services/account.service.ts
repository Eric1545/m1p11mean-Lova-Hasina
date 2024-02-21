import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = 'http://localhost:3000';
  constructor() { }
  async ajouterServiceFavoris(idUtilisateur:string,idFavoris:string){
    await axios.post(`${this.url}/api/account/ajouterServiceFavoris/${idUtilisateur}/${idFavoris}`)
  }
  async getUserById(idUtilisateur:string){
    return await axios.get(`${this.url}/api/account/getUtilisateurById/${idUtilisateur}`)
  }
}
