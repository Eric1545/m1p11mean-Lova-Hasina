import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/services/notification.service';
import { SocketService } from 'src/app/services/socket.service';
import {RendezVousService} from "../../services/rendez-vous.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombreNotification:number = 0
  nbServiceAuPanier:number = 0

  constructor(private rendezVousService: RendezVousService,private notificationService: NotificationService,private webSocketService: SocketService){}

  ngOnInit(): void {
    this.getData()
    this.obtenirNbServiceAuPanier()
    this.webSocketService.listen('notification').subscribe((data) => this.getData());
  }

  getData(){
    this.notificationService.countNotification().then((response:any)=>{
      this.nombreNotification = response.data.result
    })
  }

  obtenirNbServiceAuPanier(){
    this.rendezVousService.compteNbServiceAuPanier().then((response:any)=>{
      console.log("response: ", response)
      this.nbServiceAuPanier = response.data.nombreDeServices
    })
  }
}
