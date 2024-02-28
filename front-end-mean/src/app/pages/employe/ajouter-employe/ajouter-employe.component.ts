import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {EmployeService} from "../../../services/employe.service";

@Component({
  selector: 'app-ajouter-employe',
  templateUrl: './ajouter-employe.component.html',
  styleUrls: ['./ajouter-employe.component.css']
})
export class AjouterEmployeComponent {
  nouveauEmploye: any = {
    nom: null,
    prenom: null,
    email:null,
    username: null,
    heure_debut: null,
    heure_fin: null,
    password:null
  };
  loading: boolean = false;

  constructor(private router:Router, private employeService : EmployeService){
  }

  async ajouterEmploye(): Promise<void> {
    try {
      this.loading = true

      const dateActuelle: Date = new Date();
      this.nouveauEmploye.heure_debut = new Date(`${dateActuelle.toISOString().slice(0, 10)}T${this.nouveauEmploye.heure_debut}:00.000Z`);
      this.nouveauEmploye.heure_fin = new Date(`${dateActuelle.toISOString().slice(0, 10)}T${this.nouveauEmploye.heure_fin}:00.000Z`);

      const employeAjouter = await this.employeService.ajouterEmploye(this.nouveauEmploye);
      const messageSucces = employeAjouter.message;
      this.loading = false;
      await this.router.navigate(['/employe/liste'], { queryParams: { messageSucces } });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'employe :', error);
    }
  }

  handleFileUpload(file: File){
    this.nouveauEmploye.image_url = file.name
  }

}
