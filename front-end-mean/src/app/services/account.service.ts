import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  url = environment.host;
  constructor(private auth:AuthService) { }
  async ajouterServiceFavoris(idUtilisateur:string,idFavoris:string){
    await axios.post(`${this.url}/account/ajouterServiceFavoris/${idUtilisateur}/${idFavoris}`)
  }
  async ajouterEmployeFavoris(idFavoris:string){
    await axios.post(`${this.url}/account/ajouterUserFavoris/${this.auth.getId()}/${idFavoris}`)
  }
  async enleverEmployeFavoris(idFavoris:string){
    await axios.patch(`${this.url}/account/enleverUserFavoris/${this.auth.getId()}/${idFavoris}`)
  }
  async enleverServiceFavoris(idFavoris:string){
    await axios.patch(`${this.url}/account/enleverServiceFavoris/${this.auth.getId()}/${idFavoris}`)
  }
  async getUserById(idUtilisateur:string){
    return await axios.get(`${this.url}/account/getUtilisateurById/${idUtilisateur}`)
  }
  async getEmploye(pageNumber:number,pageSize:number){
    return await axios.get(`${this.url}/account/getUtilisateur/${pageNumber}/${pageSize}`)
  }
}
