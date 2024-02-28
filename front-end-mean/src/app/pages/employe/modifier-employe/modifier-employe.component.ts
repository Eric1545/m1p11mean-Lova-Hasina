import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeService} from "../../../services/employe.service";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-modifier-employe',
  templateUrl: './modifier-employe.component.html',
  styleUrls: ['./modifier-employe.component.css']
})
export class ModifierEmployeComponent implements OnInit {
  employeModifie: any = {
    nom: null,
    prenom: null,
    email:null,
    username: null,
    heure_debut: null,
    heure_fin: null,
    password:null,
    image_url:null
  };
  loading: boolean = false;
  id: any;

  constructor(private router:Router, private employeService : EmployeService, private route: ActivatedRoute, private authService: AuthService){
  }

  ngOnInit() {
    // Récupérer le paramètre 'id' de l'URL
    this.id = this.route.snapshot.params['id'];
    return this.obtenirEmployeParId();
  }


  async obtenirEmployeParId() {
    try {
      const result = await this.employeService.obtenirCompteParId(this.id);
      this.employeModifie = result.data;
      const dateDebut = new Date(this.employeModifie.heure_debut);
      const dateFin = new Date(this.employeModifie.heure_fin);

      let minuteDebut: string | number = dateDebut.getUTCMinutes();
      let heureDebut: string | number = dateDebut.getUTCHours();
      if (minuteDebut < 10) {
        minuteDebut = '0' + minuteDebut;
      }
      if (heureDebut < 10) {
        heureDebut = '0' + heureDebut;
      }
      let minuteFin: string | number = dateFin.getUTCMinutes();
      let heureFin: string | number = dateFin.getUTCHours();
      if (minuteFin < 10) {
        minuteFin = '0' + minuteFin;
      }
      if (heureFin < 10) {
        heureFin = '0' + heureFin;
      }

      this.employeModifie.heure_debut = heureDebut + ':' + minuteDebut;
      this.employeModifie.heure_fin = heureFin + ':' + minuteFin;
    } catch (error) {
      console.error('Erreur lors de la récupération des employes :', error);
    }
  }

  async modifierEmploye(): Promise<void> {
    try {
      const dateActuelle: Date = new Date();
      this.employeModifie.heure_debut = new Date(`${dateActuelle.toISOString().slice(0, 10)}T${this.employeModifie.heure_debut}:00.000Z`);
      this.employeModifie.heure_fin = new Date(`${dateActuelle.toISOString().slice(0, 10)}T${this.employeModifie.heure_fin}:00.000Z`);

      const employeModifie = await this.employeService.mettreAJourEmploye(this.employeModifie);
      const messageSucces = employeModifie.message;
      const role = this.authService.getRole();
      if (role === "employe") {
        await this.router.navigate(['/employe/profil'], { queryParams: { messageSucces } });
      }
      else if (role === "manager") {
        await this.router.navigate(['/employe/liste'], { queryParams: { messageSucces } });
      }
    } catch (error) {
      console.error('Erreur lors de la modification de l\'employe :', error);
    }
  }

  handleFileUpload(file: File){
    this.employeModifie.image_url = file.name
  }


}
