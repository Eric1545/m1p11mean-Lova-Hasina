import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private auth: AuthService) { }
  url = 'http://localhost:3000';
  getNotification(){
    return axios.get(`${this.url}/api/notification/getNotification/${this.auth.getId()}`)
  }
  async updateRead(idNotification:string){
    await axios.patch(`${this.url}/api/notification/updateRead/${idNotification}`)
  }
  async countNotification(){
    return axios.get(`${this.url}/api/notification/countNotification/${this.auth.getId()}`)
  }
}
