import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-ajouter-produit-favoris',
  templateUrl: './ajouter-produit-favoris.component.html',
  styleUrls: ['./ajouter-produit-favoris.component.css']
})
export class AjouterProduitFavorisComponent implements OnInit {
  listeHistoriqueRendezVous:any[]= []
  loading:boolean = false
  constructor(private service:ServiceService,private account:AccountService,private auth: AuthService) {}
  ngOnInit(): void {
    this.getService()
  } 
  getService(){
    this.service.getAllService().then((response:any)=>{
      console.log(response.data.data)
      this.listeHistoriqueRendezVous = response.data.data
    })
  }
  ajouterFavoris(idFavoris:string){
    this.account.ajouterServiceFavoris(this.auth.getId(),idFavoris).then((response: any)=>{
      console.log("vita")
    })
  }
}
