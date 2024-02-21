import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import axios from "axios";


@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = environment.host + '/account';

  async obtenirEmployes(){
    return axios.get(`${this.apiUrl}/obtenirCompteParRole/employe`)
  }

  async ajouterEmploye(data:any){
    try {
      const role = await axios.get(`${environment.host}/role`)
      const idRoleClient = role.data.data.filter((value:any)=>value.role === "employe")
      data.role = idRoleClient[0]._id
      return await axios.post(`${this.apiUrl}`, data).then();
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
