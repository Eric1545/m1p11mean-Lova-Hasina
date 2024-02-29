import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-liste-employe-favoris',
  templateUrl: './liste-employe-favoris.component.html',
  styleUrls: ['./liste-employe-favoris.component.css']
})
export class ListeEmployeFavorisComponent {

  listeEmployeFavoris:any[]= []
  loading:boolean = false
  url =environment.socket
  constructor(private account:AccountService,private auth: AuthService){}
  ngOnInit(): void {
    this.auth.redirectIfNotConnect()
    this.getData()
  }
  getData(){
    this.loading = true
    this.account.getUserById(this.auth.getId()).then((response:any)=>{
      console.log(response.data.data)
      this.listeEmployeFavoris=response.data.data.employe_fav
      this.loading = false
    })
  }
  eleverFavoris(idEmploye:string){
    this.loading = true
    this.account.enleverEmployeFavoris(idEmploye).then(() => {
      this.loading = false
      this.getData()
    })
  }
}
