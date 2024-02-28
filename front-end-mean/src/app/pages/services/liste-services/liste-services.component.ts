import {AfterViewInit, Component, OnInit} from '@angular/core';
import {filter, Subject} from "rxjs";
import {ServiceService} from "../../../services/service.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-liste-services',
  templateUrl: './liste-services.component.html',
  styleUrls: ['./liste-services.component.css']
})
export class ListeServicesComponent implements OnInit {
  services: any[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  messageSucces : any = null;

  constructor(private router:Router, private serviceService: ServiceService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType : "full_numbers",
    }
    this.route.queryParams.subscribe(params => {
      if (params && params['data']) {
        this.messageSucces = params['data'];
      }
    });
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
        const service = await this.serviceService.supprimerService(id);
        this.messageSucces = service.message;
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
