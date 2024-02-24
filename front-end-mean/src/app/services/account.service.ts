import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = 'http://localhost:3000';
  constructor(private auth:AuthService) { }
  async ajouterServiceFavoris(idUtilisateur:string,idFavoris:string){
    await axios.post(`${this.url}/api/account/ajouterServiceFavoris/${idUtilisateur}/${idFavoris}`)
  }
  async ajouterEmployeFavoris(idFavoris:string){
    await axios.post(`${this.url}/api/account/ajouterUserFavoris/${this.auth.getId()}/${idFavoris}`)
  }
  async enleverEmployeFavoris(idFavoris:string){
    await axios.patch(`${this.url}/api/account/enleverUserFavoris/${this.auth.getId()}/${idFavoris}`)
  }
  async enleverServiceFavoris(idFavoris:string){
    await axios.patch(`${this.url}/api/account/enleverServiceFavoris/${this.auth.getId()}/${idFavoris}`)
  }
  async getUserById(idUtilisateur:string){
    return await axios.get(`${this.url}/api/account/getUtilisateurById/${idUtilisateur}`)
  }
  async getEmploye(pageNumber:number,pageSize:number){
    return await axios.get(`${this.url}/api/account/getUtilisateur/${pageNumber}/${pageSize}`)
  }
}
