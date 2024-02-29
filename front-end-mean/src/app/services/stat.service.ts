import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  url = environment.socket;
  constructor() { }
  tempsMoyen(){
    return axios.get(`${this.url}/api/statistique/tempsMoyenTravailEmploye`)
  }
}
