import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ServiceService} from "../../../services/service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-liste-services',
  templateUrl: './liste-services.component.html',
  styleUrls: ['./liste-services.component.css']
})
export class ListeServicesComponent implements OnInit {
  services: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private router:Router, private serviceService: ServiceService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType : "full_numbers",
    }
    return this.obtenirServices();
  }

  async obtenirServices() {
    try {
      this.services = await this.serviceService.obtenirServices();

      // Détruire DataTable s'il est déjà initialisé
      const dataTable: any = $('#listeServiceTable').DataTable();
      if (dataTable) {
        dataTable.destroy();
      }

      this.dtTrigger.next(null);
    } catch (error) {
      console.error('Erreur lors de la récupération des services :', error);
    }
  }

  async supprimerService(id: any) {
    try {
      if (confirm('Voulez-vous supprimer ce service :' + id)) {
        await this.serviceService.supprimerService(id);
        await this.obtenirServices();
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des services :', error);
    }
  }

  async redirectModification(_id: any) {
    await this.router.navigateByUrl('/service/modifier/' + _id);
  }
}
