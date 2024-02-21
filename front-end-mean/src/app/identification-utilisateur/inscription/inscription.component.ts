import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  form: any={
    nom: null,
    prenom: null,
    email:null,
    username: null,
    password:null,
    confirmPassword:null
  }
  loading: boolean = false
  messageError:string = ""
  constructor(private router:Router,private authService:AuthService){
  }
  ngOnInit(): void {
    if(this.authService.getToken()){
      this.router.navigate(['/client/historique'])
    }
  }

  onSubmit(): void{
    if(this.form.confirmPassword !== '' && this.form.confirmPassword === this.form.password) {
      this.loading = true
      const dataUpdated = {
        ...this.form,
        heure_debut: new Date(),
        heure_fin: new Date(),
      }
       delete dataUpdated.confirmPassword;
       console.log(dataUpdated)
      
      this.authService.creationUserClient(dataUpdated).then((res:any)=>{
        this.loading = false
        this.router.navigate(['/client/historique'])
      })
    } else {
      this.messageError = "Vérifier votre mot de passe"
    }
  }
  handleFileUpload(file: File){
    console.log(file.name,'ito e')
    this.form.image_url = file.name
  }
}
