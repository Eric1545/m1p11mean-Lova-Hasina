import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ajouter-produit-favoris',
  templateUrl: './ajouter-produit-favoris.component.html',
  styleUrls: ['./ajouter-produit-favoris.component.css']
})
export class AjouterProduitFavorisComponent implements OnInit {
  listeService:any[]= []
  listeProduitFavoris:any[]= []
  loading:boolean = false
  url =environment.socket
  constructor(private service:ServiceService,private account:AccountService,private auth: AuthService) {}
  ngOnInit(): void {
    this.auth.redirectIfNotConnect()
    this.getService()
  } 
  getService(){
    this.loading = true
    this.service.obtenirServices().then((response:any)=>{
      this.listeService = response
      this.loading = false
    })
    this.account.getUserById(this.auth.getId()).then((response:any)=>{
      // console.log(response.data.data.service_favorite)
      this.listeProduitFavoris=response.data.data.service_favorite
    })
  }
  isServiceFavorite(idService:string){
    console.log(this.listeProduitFavoris.find((service:any) => service._id === idService))
    return this.listeProduitFavoris.find((service:any) => service._id === idService)
  }
  ajouterFavoris(idFavoris:string){
    this.account.ajouterServiceFavoris(this.auth.getId(),idFavoris).then((response: any)=>{
      this.getService()
    })
  }
}
