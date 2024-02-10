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
  constructor(private router:Router,private authService:AuthService){
  }
  ngOnInit(): void {
    if(this.authService.getToken()){
      this.router.navigate(['/liste-utilisateur'])
    }
  }
  onSubmit(): void{
    this.authService.login(this.form.email,this.form.password).then((res:any)=>{
      console.log(res.data)
      if(res.data.login){
        this.router.navigate(['/liste-utilisateur'])
        this.authService.storeToken(res.data.token)
      }
    })
  }
}
