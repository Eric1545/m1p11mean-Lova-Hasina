import { Injectable } from '@angular/core';
import axios from 'axios';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  url = environment.host;
  constructor(private auth: AuthService) { }
  getFactureClient(pageNumber: number,pageSize:number){
    return axios.get(`${this.url}/facture/getFactureClient/${this.auth.getId()}/${pageNumber}/${pageSize}`)
  }
  payerFacture(id: string){
    return axios.patch(`${this.url}/facture/payerFacture/${id}`)
  }
}
