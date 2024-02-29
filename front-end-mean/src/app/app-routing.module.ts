import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {TemplateComponent} from "./template/template.component";
import {ListeUtilisateurComponent} from "./utilisateur/liste-utilisateur/liste-utilisateur.component";
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: 'teste',
    component: TemplateComponent,
    children: [
      {
        path: '',
        component: ListeUtilisateurComponent
      },
    ]
  },
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
