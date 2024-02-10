import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeUtilisateurComponent } from './liste-utilisateur/liste-utilisateur.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'liste-utilisateur', component: ListeUtilisateurComponent}
];

@NgModule({
  declarations: [
    ListeUtilisateurComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UtilisateurModule { }
