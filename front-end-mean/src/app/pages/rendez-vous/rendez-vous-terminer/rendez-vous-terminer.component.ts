import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RendezVousService} from "../../../services/rendez-vous.service";

@Component({
  selector: 'app-rendez-vous-terminer',
  templateUrl: './rendez-vous-terminer.component.html',
  styleUrls: ['./rendez-vous-terminer.component.css']
})
export class RendezVousTerminerComponent implements OnInit {
  rdv: any[] = [];
  commissionTotal: any = 0;
  date: any = null;
  messageSucces : any = null;

  constructor(private router:Router, private rendezVousService: RendezVousService, private route: ActivatedRoute) { }

  ngOnInit() {
    const dateAujourdhui = new Date();
    this.date = dateAujourdhui;
    return this.obtenirRdvTerminer(this.date);
  }

  async obtenirRdvTerminer(date: any) {
    try {
      const reponse = await this.rendezVousService.obtenirRdvTerminerParEmploye(date);
      this.rdv = reponse.data.rdv;
      this.commissionTotal = reponse.data.commissionTotal;
    } catch (error) {
      console.error('Erreur lors de la récupération des rdv :', error);
    }
  }

  async chercherRdvTerminer() {
    try {
      await this.obtenirRdvTerminer(this.date);
    } catch (error) {
      console.error('Erreur lors de chercherRdv :', error);
    }
  }
}
