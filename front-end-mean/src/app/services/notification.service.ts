import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private auth: AuthService) { }
  url = environment.host;
  getNotification(){
    return axios.get(`${this.url}/notification/getNotification/${this.auth.getId()}`)
  }
  async updateRead(idNotification:string){
    await axios.patch(`${this.url}/notification/updateRead/${idNotification}`)
  }
  async countNotification(){
    return axios.get(`${this.url}/notification/countNotification/${this.auth.getId()}`)
  }
}
