import {Component, OnInit} from '@angular/core';
import {RendezVousService} from "../../../services/rendez-vous.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeService} from "../../../services/employe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-ajouter-rendez-vous',
  templateUrl: './ajouter-rendez-vous.component.html',
  styleUrls: ['./ajouter-rendez-vous.component.css']
})
export class AjouterRendezVousComponent implements OnInit {
  services: any[] = [];
  employes: any[] = [];
  nouveauRdvForm!: FormGroup;
  messageErreur : any = null;
  messageSucces : any = null;

  constructor(
    private rdvService: RendezVousService,
    private employeService: EmployeService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

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
      this.services = await this.rdvService.obtenirDernierPanierParIdClient();
      if (this.services.length === 0) {
        this.messageSucces = 'Aucun service dans le panier, veuillez en ajouter.';
      }
      else {
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
        const rdvAjouter = await this.rdvService.ajouterRdv(data);

        console.log("rdvAjouter = ", rdvAjouter)
        console.log("rdvAjouter.etat = ", rdvAjouter.etat)
        console.log("rdvAjouter.etat = ", rdvAjouter.etat)

        if (rdvAjouter.etat === 0) {
          this.messageErreur = rdvAjouter.message;
          this.messageSucces = null;
        }
        else {
          this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/rendez-vous//ajouter-au-panier']);
          });
        }
      }

    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'offre speciale :', error);
    }
  }

  async supprimerService(_id: any) {
    try {
      const reponse = await this.rdvService.supprimerServiceAuPanier(_id);
      console.log("reponse = ", reponse)
      console.log("reponse.message = ", reponse.message)
      this.messageSucces = reponse.message;
      this.services = await this.rdvService.obtenirDernierPanierParIdClient();
      if (this.services.length === 0) {
        this.messageSucces = 'Aucun service dans le panier, veuillez en ajouter.';
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier :', error);
    }
  }
}
