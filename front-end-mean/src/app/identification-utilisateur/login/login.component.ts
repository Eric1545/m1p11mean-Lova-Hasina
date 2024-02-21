import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any={
    email:null,
    password:null
  }
  mail: string|null = null
  messageErreur: string = "" 
  messageMail: string = ""
  loading: boolean = false
  loadingSendMail: boolean = false
  constructor(private router:Router,private authService:AuthService){
  }
  ngOnInit(): void {
    if(this.authService.getToken()){
      this.router.navigate(['/client/historique'])
    }
  }
  onSubmit(): void{
    this.loading = true
    this.authService.login(this.form.email,this.form.password).then((res:any)=>{
      console.log(res.data)
      if(res.data.login){
        this.router.navigate(['/client/historique'])
        this.authService.storeToken(res.data.token)
        this.authService.storeId(res.data.id)
      } else {
        this.messageErreur = "Vérifier votre user ou votre mot de passe"
      }
      this.loading = false
    })
  }
  envoyerMailReinitialisation(){
    if(this.mail){
      this.loadingSendMail=true
      this.authService.envoyerMailReinitialisation(this.mail).then((res:any)=>{
        this.loadingSendMail=false
        this.messageMail = "Un mail de réinitialisation de mot de passe vous a été envoyé"
      }).catch((err:any)=>{
        this.loadingSendMail=false
        this.messageMail = "Votre mail n'existe pas dans notre base de données ou une erreur s'est produite"
      })
    }
  }

}
