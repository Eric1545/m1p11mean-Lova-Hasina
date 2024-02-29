import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { SocketService } from 'src/app/services/socket.service';
import {RendezVousService} from "../../services/rendez-vous.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  nombreNotification:number = 0
  nbServiceAuPanier:number = 0
  
  isDropdownOpen: boolean = false;

  constructor(
    private rendezVousService: RendezVousService,
    private notificationService: NotificationService,
    private webSocketService: SocketService,
    private auth: AuthService,
    private router:Router
  ) {}
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
  async deconnexion(){
    // await this.auth.deconnexion()
    
    this.router.navigate(['/login'])
  }

  obtenirNbServiceAuPanier(){
    this.rendezVousService.compteNbServiceAuPanier().then((response:any)=>{
      console.log("response: ", response)
      this.nbServiceAuPanier = response.data.nombreDeServices
    })
  }
  togglePushMenu(event: Event) {
    event.preventDefault(); // prevent default behavior of the link
    const body = document.querySelector('body');
    if (body) {
      body.classList.toggle('sidebar-collapse'); // toggle class to collapse/expand sidebar
    }
  }
  
  toggleDropdownMenu(event: Event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  toggleFullscreen(event: Event) {
    event.preventDefault(); // Empêche le comportement par défaut du lien
    // Logique pour basculer le mode plein écran
    const elem = document.documentElement;
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch(err => {
        console.log(`Erreur lors du passage en mode plein écran : ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }
}
