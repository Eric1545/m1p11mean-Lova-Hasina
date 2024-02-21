import { Injectable } from '@angular/core';
import axios from 'axios';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = environment.host + '/service';

  async ajouterService(nouveauService: any){
    try {
      const response = await axios.post(this.apiUrl, nouveauService);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async obtenirServices(): Promise<any[]>  {
    try {
      const response = await axios.get(this.apiUrl);
      console.log(response.data.data)
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async obtenirServiceParId(id: any): Promise<any> {
    try {
      console.log("===================")
      console.log(id)
      console.log("===================")
      const response = await axios.get(`${this.apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async mettreAJourService(serviceModifie: any): Promise<any> {
    try {
      const response = await axios.put(`${this.apiUrl}/${serviceModifie._id}`, serviceModifie);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async supprimerService(id: any): Promise<any> {
    try {
      const response = await axios.delete(`${this.apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
