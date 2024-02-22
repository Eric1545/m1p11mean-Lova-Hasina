import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {EmployeService} from "../../../services/employe.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-liste-employe',
  templateUrl: './liste-employe.component.html',
  styleUrls: ['./liste-employe.component.css']
})
export class ListeEmployeComponent implements OnInit {

  constructor(private router:Router, private employeService: EmployeService) { }

  employes: any;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.dtOptions = {
      pagingType : "full_numbers",
    }
    return this.obtenirEmployes();
  }

  async obtenirEmployes() {
    try {
      const employeObtenue = await this.employeService.obtenirEmployes();
      this.employes = employeObtenue.data.data;

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
        await this.employeService.supprimerEmploye(id);
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
