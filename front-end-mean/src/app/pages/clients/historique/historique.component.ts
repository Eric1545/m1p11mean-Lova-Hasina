import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { RendezVousService } from 'src/app/services/rendez-vous.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  constructor(private rendezVousService: RendezVousService,private authService: AuthService,private router:Router){}
  listeHistoriqueRendezVous:any[]= []
  pageNumber: number = 1;
  pageSize: number = 10;

  totalItems: number = 0;
  loading: boolean = false;

  ngOnInit(): void {
    this.authService.redirectIfNotConnect()
      this.loadRendezVous(this.pageNumber, this.pageSize);
  }
  loadRendezVous(pageNumber: number, pageSize: number): void {
    this.loading = true
    this.rendezVousService.getRendezVous(this.authService.getId(),pageNumber, pageSize).then((response) => {
      this.listeHistoriqueRendezVous = response.data.data;
      this.totalItems = response.data.nombrePage; 
      this.loading = false
    });
  }

  onPageChange(page: number) {
    this.pageNumber = page;
    this.loadRendezVous(this.pageNumber, this.pageSize); 
  }
}
