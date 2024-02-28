import { Component } from '@angular/core';
import {ServiceService} from "../../../services/service.service";
import {Router} from "@angular/router";

  @Component({
    selector: 'app-ajouter-services',
    templateUrl: './ajouter-services.component.html',
    styleUrls: ['./ajouter-services.component.css']
  })
  export class AjouterServicesComponent {
    nouveauService: any = {
      nom: null,
      prix: null,
      duree: null,
      commission: null
    }

  constructor(private router:Router, private serviceService : ServiceService){
  }

  async ajouterService(): Promise<void> {
    try {
      const serviceAjouter = await this.serviceService.ajouterService(this.nouveauService);
      const data = serviceAjouter.message;
      await this.router.navigate(['/service/liste'], { queryParams: { data } });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du service :', error);
    }
  }

  handleFileUpload(file: File){
    this.nouveauService.image = file.name
  }

}
