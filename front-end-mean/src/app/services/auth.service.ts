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
}
