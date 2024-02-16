import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  url = 'http://localhost:3000';
  constructor() { }
  uploadFile(file:File){
    const formData = new FormData()
    formData.append('file',file)
    axios.post(`${this.url}/api/upload`,formData,{
      headers:{'Content-Type': 'multipart/form-data'}
    })
  }
}
