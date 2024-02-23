import { Injectable } from '@angular/core';
import axios from 'axios';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //ao anaty cookie le token amizay securisé koko
  constructor(private cookieService: CookieService){}
  url = 'http://localhost:3000';
  storeToken(token: string) {
    this.cookieService.set('authToken', token);
  }
  storeId(id:string) {
    this.cookieService.set("id",id);
  }
  
  storeRole(role:string) {
    this.cookieService.set("role",role);
  }
  getToken() {
    return this.cookieService.get('authToken');
  }
  getId(){
    return this.cookieService.get('id');
  }
  getRole(){
    return this.cookieService.get('role');
  }
  clearToken() {
    this.cookieService.delete('authToken');
    this.cookieService.delete('id');
  }
  
  async login(username:string,password:string){
    try{
      return await axios.post(`${this.url}/api/account/login`,{username,password})
    }
    catch(err){
      return null
    }
  }
  async creationUserClient(data:any){
    try{
      const role = await axios.get(`${this.url}/api/role`)
      const idRoleClient = role.data.data.filter((value:any)=>value.role === "client")
      data.role = idRoleClient[0]._id
      return await axios.post(`${this.url}/api/account`,data)
    }
    catch(err){
      return null
    }
  }
  async envoyerMailReinitialisation(email: string) {
    axios .post(`${this.url}/api/account/mdpoublie`, {email})
  }
  async reinitialiserMotDePasse(token: string,mdp: string) {
    console.log(token);
    try {
      return await axios.post(
        `${this.url}/api/account/reinitilaserMdp`, 
        {mdp}, 
        {
          headers: {
            Authorization: token
          }
        }
      );
    } catch (err) {
      return null;
    }
  }
  

}
