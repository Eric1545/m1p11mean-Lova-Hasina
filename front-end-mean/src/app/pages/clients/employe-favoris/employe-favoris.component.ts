import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employe-favoris',
  templateUrl: './employe-favoris.component.html',
  styleUrls: ['./employe-favoris.component.css']
})
export class EmployeFavorisComponent implements OnInit {

  listeEmploye: any[] = []
  pageNumber: number = 1;
  pageSize: number = 10;

  totalItems: number = 0;
  loading: boolean = false;
  listeEmployeFavoris:any[]= []
  url = environment.socket
  constructor(private accountService:AccountService,private auth: AuthService){}
  ngOnInit(): void {
    this.auth.redirectIfNotConnect()
    this.getData(this.pageNumber, this.pageSize)
  }
  getData(pageNumber: number, pageSize: number){
    this.loading = true
    this.accountService.getEmploye(pageNumber,pageSize).then((response) => {
      console.log(response.data)
      this.listeEmploye = response.data.data
      this.totalItems = response.data.nombrePage
      this.loading= false
    })
    this.accountService.getUserById(this.auth.getId()).then((response:any)=>{
      // console.log(response.data.data.employe_fav)
      this.listeEmployeFavoris=response.data.data.employe_fav
    })
  }
  
  onPageChange(page: number) {
    this.pageNumber = page;
    this.getData(this.pageNumber, this.pageSize); 
  }
  ajouterFavoris(idEmploye:string){
    this.loading = true
    this.accountService.ajouterEmployeFavoris(idEmploye).then(() => {
      this.loading = false
    })
    this.getData(this.pageNumber, this.pageSize)
    console.log(idEmploye)
  }
  
  isEmployeFavorite(idService:string){
    console.log(this.listeEmployeFavoris.find((service:any) => service._id === idService))
    return this.listeEmployeFavoris.find((service:any) => service._id === idService)
  }
}
