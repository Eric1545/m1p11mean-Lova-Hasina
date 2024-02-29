import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url = environment.socket;
  constructor() { }
  uploadFile(file:File){
    const formData = new FormData()
    formData.append('file',file)
    axios.post(`${this.url}/api/upload`,formData,{
      headers:{'Content-Type': 'multipart/form-data'}
    })
  }
}
