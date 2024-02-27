import { Component, OnInit } from '@angular/core';
import { FactureService } from 'src/app/services/facture.service';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit{
  listeFacture:any[]= []
  pageNumber: number = 1;
  pageSize: number = 10;

  totalItems: number = 0;
  loading: boolean = false;
  constructor(private factureService: FactureService,private webSocketService: SocketService){}
  ngOnInit(): void {
      this.loadRendezVous(this.pageNumber,this.pageSize)
      this.webSocketService.listen('facture').subscribe((data) => this.loadRendezVous(this.pageNumber,this.pageSize));
  }
  loadRendezVous(pageNumber: number, pageSize: number): void {
    this.loading = true
    this.factureService.getFactureClient(pageNumber, pageSize).then((response) => {
      console.log(response.data.data)
      this.listeFacture = response.data.data;
      this.totalItems = response.data.nombrePage; 
      this.loading = false
    });
  }

  onPageChange(page: number) {
    this.pageNumber = page;
    this.loadRendezVous(this.pageNumber, this.pageSize); 
  }
  payer(id: string){
    console.log(id)
    this.factureService.payerFacture(id).then((response) => {
      console.log(response.data)
      this.loadRendezVous(this.pageNumber, this.pageSize);
    });
  }
}
