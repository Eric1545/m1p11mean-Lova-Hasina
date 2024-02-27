import {Component, OnInit} from '@angular/core';
import {RendezVousService} from "../../../services/rendez-vous.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeService} from "../../../services/employe.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajouter-rendez-vous',
  templateUrl: './ajouter-rendez-vous.component.html',
  styleUrls: ['./ajouter-rendez-vous.component.css']
})
export class AjouterRendezVousComponent implements OnInit {
  services: any[] = [];
  employes: any[] = [];
  nouveauRdvForm!: FormGroup;

  constructor(private rdvService: RendezVousService, private employeService: EmployeService, private fb: FormBuilder, private router: Router) {
  }

  async ngOnInit(){
    this.nouveauRdvForm = this.fb.group({
      employe: [null, Validators.required],
      nom: ['', Validators.required],
      date_heure: ['', Validators.required]
    });
    this.services = await this.rdvService.obtenirDernierPanierParIdClient();
    console.log(this.services)
    const employeObtenue = await this.employeService.obtenirEmployes();
    this.employes = employeObtenue.data.data;
  }

  async ajouterRdv() {
    try {

      if (!this.nouveauRdvForm) {
        console.error("Le formulaire n'est pas correctement initialisé");
        return;
      }

      const form = this.nouveauRdvForm.value;
      console.log("form = ", form);
      const data = {
        "employe_id": form.employe,
        "date_heure": form.date_heure
      }
      await this.rdvService.ajouterRdv(data);

      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/rendez-vous//ajouter-au-panier']);
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'offre speciale :', error);
    }
  }

  async supprimerService(_id: any) {
    try {
      await this.rdvService.supprimerServiceAuPanier(_id);
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/rendez-vous/ajouter']);
      });
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier :', error);
    }
  }
}
