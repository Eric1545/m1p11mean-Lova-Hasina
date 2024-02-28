import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class StatService {
  url = 'http://localhost:3000';
  constructor() { }
  tempsMoyen(){
    return axios.get(`${this.url}/api/statistique/tempsMoyenTravailEmploye`)
  }
}
