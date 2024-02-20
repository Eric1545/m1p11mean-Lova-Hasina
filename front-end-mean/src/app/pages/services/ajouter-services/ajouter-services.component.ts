import { Component } from '@angular/core';
import {ServiceService} from "../../../services/service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajouter-services',
  templateUrl: './ajouter-services.component.html',
  styleUrls: ['./ajouter-services.component.css']
})
export class AjouterServicesComponent {
  form: any = {
    nom: null,
    prix: null,
    duree: null,
    commission: null
  }

  constructor(private router:Router, private serviceService : ServiceService){
  }

  onSubmit(): void {
    this.serviceService.createService(this.form).then((res:any)=>{
      this.router.navigate(['/service/liste']);
    })

  }
}
