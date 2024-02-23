import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  constructor(private auth:AuthService){}
  sideBar: any[] = []
  ngOnInit(): void {
    if(this.auth.getRole() === "admin"){
      this.sideBar=[
        {
          name: "Services",
          icon: "nav-icon fas fa-cogs",
          path:"#",
          enfant:[
            {
              name:"Liste",
              icon: "fas fa-list-ul nav-icon",
              path: "/service/liste"
            },
            {
              name:"Ajouter",
              icon: "fas fa-plus nav-icon",
              path: "/service/ajouter"
            },
          ]
        },
        {
          name: "Employes",
          icon: "nav-icon fas fa-user",
          path:"#",
          enfant:[
            {
              name:"Liste",
              icon: "fas fa-list-ul nav-icon",
              path: "/employe/liste"
            },
            {
              name:"Ajouter",
              icon: "fas fa-plus nav-icon",
              path: "/employe/ajouter"
            },
          ]
        },
        {
          name: "Offre speciale",
          icon: "nav-icon fas fa-user",
          path:"#",
          enfant:[
            {
              name:"Liste",
              icon: "fas fa-list-ul nav-icon",
              path: "/offre-speciale/liste"
            },
            {
              name:"Ajouter",
              icon: "fas fa-plus nav-icon",
              path: "/offre-speciale/ajouter"
            },
          ]
        },
      ]
    }
    else if(this.auth.getRole()=== "client"){
      this.sideBar=[
        {
          name: "Historique",
          icon: "nav-icon fas fa-cogs",
          path: "/client/historique",
        },
        {
          name: "Employes favoris",
          icon: "nav-icon fas fa-cogs",
          path: "#",
          enfant:[
            {
              name:"Liste",
              icon: "fas fa-list-ul nav-icon",
              path: "/service/liste"
            },
            {
              name:"Ajouter",
              icon: "fas fa-plus nav-icon",
              path: "/service/ajouter"
            },
          ]
        },
        {
          name: "Service Favoris",
          icon: "nav-icon fas fa-cogs",
          path: "#",
          enfant:[
            {
              name:"Liste",
              icon: "fas fa-list-ul nav-icon",
              path: "/client/listeServiceFavoris"
            },
            {
              name:"Ajouter",
              icon: "fas fa-plus nav-icon",
              path: "/client/ajouterServiceFavoris"
            },
          ]
        },
        
      ]
    }
  }
}
