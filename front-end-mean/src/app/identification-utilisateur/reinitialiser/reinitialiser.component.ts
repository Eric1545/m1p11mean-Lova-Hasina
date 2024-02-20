import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reinitialiser',
  templateUrl: './reinitialiser.component.html',
  styleUrls: ['./reinitialiser.component.css']
})
export class ReinitialiserComponent {
  id: string | undefined;
  messageErreur: string = ""
  loading: boolean = false
  form: any = {
    password: null,
    confirmPassword: null
  }
  constructor(private route: ActivatedRoute, private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Récupérer l'ID de l'URL
      console.log(this.id); // Afficher l'ID dans la console à des fins de débogage
    });
  }
  onSubmit() {
    if (this.form.password === this.form.confirmPassword) {
      this.loading = true
      if (this.id) {
        this.authService.reinitialiserMotDePasse(this.id,this.form.password).then((res: any) => {
          console.log(res.data)
          this.loading = false
          this.router.navigate(['/historique'])
        }).catch((err: any) => {
          console.log(err)
          this.loading = false
          this.messageErreur = "Vous n'êtes pas autorisé à effectuer cette action ou le lien a expiré"
        })
      }
    } else {
      this.messageErreur = "Les mots de passe ne correspondent pas"
    }
  }
}
