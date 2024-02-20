import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-liste-produit-favoris',
  templateUrl: './liste-produit-favoris.component.html',
  styleUrls: ['./liste-produit-favoris.component.css']
})
export class ListeProduitFavorisComponent implements OnInit {

  listeProduitFavoris:any[]= []
  loading:boolean = false
  constructor(private account:AccountService,private auth: AuthService){}
  ngOnInit(): void {
      this.getData()
  }
  getData(){
    this.account.getUserById(this.auth.getId()).then((response:any)=>{
      console.log(response.data.data.service_favorite)
      this.listeProduitFavoris=response.data.data.service_favorite
    })
  }
}
