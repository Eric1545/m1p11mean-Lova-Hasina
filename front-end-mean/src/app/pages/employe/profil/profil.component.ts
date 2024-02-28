import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeService} from "../../../services/employe.service";
import {Subject} from "rxjs";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  constructor(private router:Router, private employeService: EmployeService, private route: ActivatedRoute) { }
  employe: any;
  messageSucces : any = null;


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params['messageSucces']) {
        this.messageSucces = params['messageSucces'];
      }
    });
    return this.obtenirEmploye();
  }

  async obtenirEmploye() {
    try {
      const employeObtenue = await this.employeService.obtenirEmployeParId();
      this.employe = employeObtenue.data;
      console.log(this.employe)
      this.employe.heure_debut = new Date(this.employe.heure_debut);
      this.employe.heure_fin = new Date(this.employe.heure_fin);
    } catch (error) {
      console.error('Erreur lors de la récupération des employes :', error);
    }
  }

  async redirectModification(_id: any) {
    await this.router.navigateByUrl('/employe/modifier/' + _id);
  }
}
