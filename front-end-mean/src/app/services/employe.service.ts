import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import axios from "axios";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = environment.host + '/account';

  constructor(private auth:AuthService) { }

  async obtenirEmployes(){
    return axios.get(`${this.apiUrl}/obtenirCompteParRole/employe`)
  }

  async ajouterEmploye(data:any){
    try {
      const role = await axios.get(`${environment.host}/role`)
      const idRoleClient = role.data.data.filter((value:any)=>value.role === "employe")
      data.role = idRoleClient[0]._id
      const reponse = await axios.post(`${this.apiUrl}`, data);
      return reponse.data;
    } catch(error){
      throw error;
    }
  }


  async obtenirCompteParId(id: any): Promise<any> {
    try {
      const response = await axios.get(`${this.apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  async obtenirEmployeParId(): Promise<any> {
    try {
      return await this.obtenirCompteParId(this.auth.getId());
    } catch (error) {
      throw error;
    }
  }

  async mettreAJourEmploye(employeModifie: any): Promise<any> {
    try {
      const response = await axios.put(`${this.apiUrl}/${employeModifie._id}`, employeModifie);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async supprimerEmploye(id: any): Promise<any> {
    try {
      const response = await axios.delete(`${this.apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

}
