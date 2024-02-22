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
    password:null
  };
  loading: boolean = false;

  constructor(private router:Router, private employeService : EmployeService){
  }

  async ajouterEmploye(): Promise<void> {
    try {
      this.loading = true
      const employeAInserer = {
        ...this.nouveauEmploye,
        heure_debut: new Date(),
        heure_fin: new Date(),
      }
      await this.employeService.ajouterEmploye(employeAInserer);
      this.loading = false;
      await this.router.navigate(['/employe/liste']);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'employe :', error);
    }
  }

  handleFileUpload(file: File){
    this.nouveauEmploye.image_url = file.name
  }

}
