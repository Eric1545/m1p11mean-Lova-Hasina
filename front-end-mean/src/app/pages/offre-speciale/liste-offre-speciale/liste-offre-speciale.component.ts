import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {OffreSpecialeService} from "../../../services/offre-speciale.service";

@Component({
  selector: 'app-liste-offre-speciale',
  templateUrl: './liste-offre-speciale.component.html',
  styleUrls: ['./liste-offre-speciale.component.css']
})
export class ListeOffreSpecialeComponent implements OnInit {
  offreSpeciales: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router:Router, private offreSpecialeService: OffreSpecialeService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType : "full_numbers",
    }
    return this.obtenirOffreSpeciales();
  }

  async obtenirOffreSpeciales() {
    try {
      const reponse = await this.offreSpecialeService.obtenirOffreSpeciales();
      this.offreSpeciales = reponse.data.data;

      // Détruire DataTable s'il est déjà initialisé
      const dataTable: any = $('#listeOffreSpecialeTable').DataTable();
      if (dataTable) {
        dataTable.destroy();
      }

      this.dtTrigger.next(null);
    } catch (error) {
      console.error('Erreur lors de la récupération des offre speciales :', error);
    }
  }

  async supprimerOffreSpeciale(id: any) {
    try {
      if (confirm('Voulez-vous supprimer ce offre speciale :' + id)) {
        await this.offreSpecialeService.supprimerOffreSpeciale(id);
        await this.obtenirOffreSpeciales();
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des offreSpeciales :', error);
    }
  }

  async redirectModification(_id: any) {
    await this.router.navigateByUrl('/offre-speciale/modifier/' + _id);
  }
}
