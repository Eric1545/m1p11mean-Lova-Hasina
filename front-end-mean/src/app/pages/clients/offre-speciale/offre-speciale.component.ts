import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OffreSpecialeService } from 'src/app/services/offre-speciale.service';

@Component({
  selector: 'app-offre-speciale',
  templateUrl: './offre-speciale.component.html',
  styleUrls: ['./offre-speciale.component.css']
})
export class OffreSpecialeComponent {
  constructor(private offreSpeciale: OffreSpecialeService, private authService: AuthService, private router: Router) { }
  listeOffreSpeciale: any[] = []
  pageNumber: number = 1;
  pageSize: number = 10;

  totalItems: number = 0;
  loading: boolean = false;

  ngOnInit(): void {
    if (!this.authService.getToken()) {
      this.router.navigate(['/login'])
    } else {
      this.loadOffreSpeciale(this.pageNumber, this.pageSize);
    }
  }
  loadOffreSpeciale(pageNumber: number, pageSize: number): void {
    this.loading = true
    this.offreSpeciale.getAlloffreSpeciale(pageNumber, pageSize).then((response) => {
      console.log(response.data)
      this.listeOffreSpeciale = response.data.data;
      this.totalItems = response.data.nombrePage;
      this.loading = false
    });
  }

  onPageChange(page: number) {
    this.pageNumber = page;
    this.loadOffreSpeciale(this.pageNumber, this.pageSize);
  }
}
