import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {OffreSpecialeService} from "../../../services/offre-speciale.service";
import {RendezVousService} from "../../../services/rendez-vous.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-liste-rendez-vous',
  templateUrl: './liste-rendez-vous.component.html',
  styleUrls: ['./liste-rendez-vous.component.css']
})
export class ListeRendezVousComponent implements OnInit {
  rdv: any[] = [];
  date: any = null;
  messageSucces : any = null;

  constructor(private router:Router, private rendezVousService: RendezVousService, private route: ActivatedRoute) { }

  ngOnInit() {
    const dateAujourdhui = new Date();
    this.date = dateAujourdhui;
    return this.obtenirRdv(this.date);
  }

  async obtenirRdv(date: any) {
    try {
      const reponse = await this.rendezVousService.obtenirRdvParEmploye(date);
      this.rdv = reponse.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des rdv :', error);
    }
  }

  async terminerRdv(idRdv: any) {
    try {
      if (confirm('Voulez-vous vraiment terminer cette rendez vous ?')) {
        const reponse = await this.rendezVousService.terminerRdv(idRdv);
        this.messageSucces = reponse.message;
        await this.obtenirRdv(this.date);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des offreSpeciales :', error);
    }
  }

  async chercherRdv() {
    try {
      await this.obtenirRdv(this.date);
    } catch (error) {
      console.error('Erreur lors de la récupération des offreSpeciales :', error);
    }
  }
}
