import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  url = 'http://localhost:3000';
  getRendezVous(pageNumber: number,pageSize:number){
    return axios.get(`${this.url}/api/rendezVous/getRendezVous/${pageNumber}/${pageSize}`)
  }

}
