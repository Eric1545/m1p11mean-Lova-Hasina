import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {
  url = 'http://localhost:3000';
  getRendezVous(id: string,pageNumber: number,pageSize:number){
    return axios.get(`${this.url}/api/rendezVous/getRendezVous/${id}/${pageNumber}/${pageSize}`)
  }
  getRendezVousById(id: string){
    return axios.get(`${this.url}/api/rendezVous/${id}`)
  }
}
