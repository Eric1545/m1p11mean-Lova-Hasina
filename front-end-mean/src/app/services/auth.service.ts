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

  getToken() {
    return this.cookieService.get('authToken');
  }

  clearToken() {
    this.cookieService.delete('authToken');
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
}
