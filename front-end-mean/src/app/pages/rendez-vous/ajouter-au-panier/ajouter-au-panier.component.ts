import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ServiceService} from "../../../services/service.service";
import {RendezVousService} from "../../../services/rendez-vous.service";

@Component({
  selector: 'app-ajouter-au-panier',
  templateUrl: './ajouter-au-panier.component.html',
  styleUrls: ['./ajouter-au panier.component.css']
})
export class AjouterAuPanierComponent implements OnInit{
  services: any[] = [];

  constructor(private serviceService: ServiceService, private rdvService: RendezVousService, private router: Router) {}

  async ngOnInit() {
    this.services = await this.serviceService.obtenirServices();
  }

  async ajouterAuPanier(idService: any) {
    try {
      const data = {
        "services": [
          idService
        ],
      };
      await this.rdvService.ajouterAuPanier(data);
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/rendez-vous/ajouter-au-panier']);
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier :', error);
    }
  }

}
