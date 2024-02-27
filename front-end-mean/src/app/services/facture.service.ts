import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  url = 'http://localhost:3000';
  constructor(private auth: AuthService) { }
  getFactureClient(pageNumber: number,pageSize:number){
    return axios.get(`${this.url}/api/facture/getFactureClient/${this.auth.getId()}/${pageNumber}/${pageSize}`)
  }
}
