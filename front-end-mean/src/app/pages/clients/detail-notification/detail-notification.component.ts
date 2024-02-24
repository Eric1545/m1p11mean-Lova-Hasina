import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { OffreSpecialeService } from 'src/app/services/offre-speciale.service';
import { RendezVousService } from 'src/app/services/rendez-vous.service';

@Component({
  selector: 'app-detail-notification',
  templateUrl: './detail-notification.component.html',
  styleUrls: ['./detail-notification.component.css']
})
export class DetailNotificationComponent implements OnInit {
  constructor(private router:ActivatedRoute,private offreSpecial:OffreSpecialeService,private rendezVous: RendezVousService,private authService:AuthService){}
  type:string|null = ""
  id:string|null = ""
  detailNotification:any
  ngOnInit(): void {
    this.authService.redirectIfNotConnect()
    console.log(this.router.snapshot.params)
    this.type = this.router.snapshot.paramMap.get('type')
    this.id = this.router.snapshot.paramMap.get('id')
    if(this.type === "offre"){
      this.offreSpecial.obtenirOffreSpecialeParId(this.id).then((response)=>{
        console.log("offre speciale:",response.data.data)
        this.detailNotification = response.data.data
      })
      console.log("offre")
    } else if(this.type === "rappel"){
      console.log("rappel")
      if(this.id !== null){
        this.rendezVous.getRendezVousById(this.id).then((response)=>{
          console.log("rendez vous:",response.data.rendezVous)
          this.detailNotification = response.data.rendezVous
        })
      }
    }
  }
}
