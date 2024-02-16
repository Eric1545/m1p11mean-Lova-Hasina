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
  constructor(private router:Router,private authService:AuthService){
  }
  ngOnInit(): void {
    if(this.authService.getToken()){
      this.router.navigate(['/liste-utilisateur'])
    }
  }

  onSubmit(): void{
    if(this.form.confirmPassword !== '' && this.form.confirmPassword === this.form.password) {
      const dataUpdated = {
        ...this.form,
        heure_debut: new Date(),
        heure_fin: new Date(),
      }
       delete dataUpdated.confirmPassword;
       console.log(dataUpdated)
      this.authService.creationUserClient(dataUpdated)
    }
  }
  handleFileUpload(file: File){
    console.log(file,'ito e')
  }
}
