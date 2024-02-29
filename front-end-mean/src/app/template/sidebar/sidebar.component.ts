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
    if(this.auth.getRole() === "manager"){
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
          icon: "nav-icon fas fa-gift",
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
        {
          name: "Statistiques",
          icon: "nav-icon fas fa-chart-line",
          path:"#",
          enfant:[
            {
              name:"Temps moyen de travail",
              icon: "nav-icon fas fa-chart-bar",
              path: "/stat/tempsMoyen"
            },
            {
              name:"reservation",
              icon: "nav-icon fas fa-chart-bar",
              path: "/statistiques/reservation"
            },
            {
              name:"chiffre d'affaire",
              icon: "nav-icon fas fa-chart-bar",
              path: "/statistiques/chiffre-affaire"
            },
          ]
        },
      ]
    }
    else if(this.auth.getRole()=== "client"){
      this.sideBar=[
        {
          name: "Historique",
          icon: "nav-icon fas fa-history",
          path: "/client/historique",
        },
        {
          name: "Factures",
          icon: "nav-icon fas fa-file-invoice-dollar",
          path: "/client/facture",
        },
        {
          name: "Offre speciale",
          icon: "nav-icon fas fa-gift",
          path: "/client/offreSpeciale",
        },
        {
          name: "Employes favoris",
          icon: "nav-icon fas fa-star",
          path: "#",
          enfant:[
            {
              name:"Liste",
              icon: "fas fa-list-ul nav-icon",
              path: "/client/listeEmployeFavoris"
            },
            {
              name:"Ajouter",
              icon: "fas fa-plus nav-icon",
              path: "/client/ajouterEmployerFavoris"
            },
          ]
        },
        {
          name: "Service Favoris",
          icon: "nav-icon fas fa-heart",
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
        {
        name: "Rendez vous",
        icon: "nav-icon far fa-calendar-alt",
        path:"#",
        enfant:[
          {
            name:"Ajouter-au-panier",
            icon: "fas fa-plus nav-icon",
            path: "/rendez-vous/ajouter-au-panier"
          },
        ]
      },

      ]
    }
    else if(this.auth.getRole()=== "employe"){
      this.sideBar=[
        {
          name: "Rendez vous",
          icon: "nav-icon far fa-calendar-alt",
          path: "#",
          enfant: [
            {
              name: "Liste",
              icon: "fas fa-plus nav-icon",
              path: "/rendez-vous/liste"
            },
          ]
        },
        {
          name: "Profil",
          icon: "nav-icon fas fa-user",
          path:"/employe/profil"
        },
        {
          name: "Suivi de tâche",
          icon: "nav-icon fas fa-check",
          path:"/rendez-vous/terminer"
        },
      ]
    }
  }
}
