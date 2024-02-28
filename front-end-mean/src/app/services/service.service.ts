import { Injectable } from '@angular/core';
import axios from 'axios';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Validators} from "@angular/forms";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = environment.host + '/service';

  constructor(private auth: AuthService) { }

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
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }


  async obtenirServicePanier(): Promise<any[]>  {
    try {
      const response = await axios.get(`${this.apiUrl}/obtenirServicePanier/${this.auth.getId()}`);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  }

  async obtenirServiceParId(id: any): Promise<any> {
    try {
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
