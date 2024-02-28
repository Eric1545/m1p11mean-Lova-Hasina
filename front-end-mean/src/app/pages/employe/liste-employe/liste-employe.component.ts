import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {EmployeService} from "../../../services/employe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-liste-employe',
  templateUrl: './liste-employe.component.html',
  styleUrls: ['./liste-employe.component.css']
})
export class ListeEmployeComponent implements OnInit {

  constructor(private router:Router, private employeService: EmployeService, private route: ActivatedRoute) { }

  employes: any;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();
  messageSucces : any = null;

  ngOnInit() {
    this.dtOptions = {
      pagingType : "full_numbers",
    }
    this.route.queryParams.subscribe(params => {
      if (params && params['messageSucces']) {
        this.messageSucces = params['messageSucces'];
      }
    });
    return this.obtenirEmployes();
  }

  async obtenirEmployes() {
    try {
      const employeObtenue = await this.employeService.obtenirEmployes();
      this.employes = employeObtenue.data.data;
      this.employes.forEach((employe: any) => {
        employe.heure_debut = new Date(employe.heure_debut);
        employe.heure_fin = new Date(employe.heure_fin);
      });

      // Détruire DataTable s'il est déjà initialisé
      const dataTable: any = $('#listeEmployeTable').DataTable();
      if (dataTable) {
        dataTable.destroy();
      }

      this.dtTrigger.next(null);
    } catch (error) {
      console.error('Erreur lors de la récupération des employes :', error);
    }
  }

  async supprimerEmploye(id: any) {
    try {
      if (confirm('Voulez-vous supprimer ce employe :' + id)) {
        const employe = await this.employeService.supprimerEmploye(id);
        this.messageSucces = employe.message;
        await this.obtenirEmployes();
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des employes :', error);
    }
  }

  async redirectModification(_id: any) {
    await this.router.navigateByUrl('/employe/modifier/' + _id);
  }
}
