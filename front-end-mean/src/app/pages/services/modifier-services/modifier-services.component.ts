import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ServiceService} from "../../../services/service.service";

@Component({
  selector: 'app-modifier-services',
  templateUrl: './modifier-services.component.html',
  styleUrls: ['./modifier-services.component.css']
})
export class ModifierServicesComponent implements OnInit{
  serviceModifie: any = {
    nom: null,
    prix: null,
    duree: null,
    commission: null
  }
  id: any;

  constructor(private router:Router, private serviceService : ServiceService, private route: ActivatedRoute){
  }

  ngOnInit() {
    // Récupérer le paramètre 'id' de l'URL
    this.id = this.route.snapshot.params['id'];
    return this.obtenirServiceParId();
  }

  async obtenirServiceParId() {
    try {
      const result = await this.serviceService.obtenirServiceParId(this.id);
      console.log(result)
      this.serviceModifie = result.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des services :', error);
    }
  }

  async modifierService(): Promise<void> {
    try {
      const serviceModifie = await this.serviceService.mettreAJourService(this.serviceModifie);
      const data = serviceModifie.message;
      await this.router.navigate(['/service/liste'], { queryParams: { data } });
    } catch (error) {
      console.error('Erreur lors de la modification du service :', error);
    }
  }

  handleFileUpload(file: File){
    this.serviceModifie.image = file.name
  }

}
