import { Injectable } from '@angular/core';
import axios from 'axios';
import {environment} from "../../environments/environment";

const URL_BASE = environment.host + '/service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  async getAllService(){
    console.log(URL_BASE);
    return axios.get(`${URL_BASE}`)
  }


  async createService(data:any){
    try {
      console.log("=================")
      console.log(data);
      console.log(URL_BASE);
      console.log("=================")
      return await axios.post(`${URL_BASE}`, data).then();
    }
    catch(err){
      return null
    }
  }

}
