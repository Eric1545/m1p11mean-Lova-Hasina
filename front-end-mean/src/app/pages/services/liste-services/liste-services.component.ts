import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {ServiceService} from "../../../services/service.service";

@Component({
  selector: 'app-liste-services',
  templateUrl: './liste-services.component.html',
  styleUrls: ['./liste-services.component.css']
})
export class ListeServicesComponent implements OnInit {

  constructor(private service: ServiceService) { }

  services: any;
  dtOptions: DataTables.Settings={};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit() {
    this.dtOptions = {
      pagingType : "full_numbers",
    }
    this.LoadService();
  }

  LoadService() {
    this.service.getAllService().then((response) => {
      console.log("================")
      console.log(response)
      console.log("testeeeeee")
      console.log(response.data)
      console.log("testeeeeee")
      console.log(response.data.data)
      console.log("testeeeeee")
      console.log("================")
      this.services = response.data.data;
      this.dtTrigger.next(null);
    });
  }
}
