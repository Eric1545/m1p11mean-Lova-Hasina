import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeUtilisateurComponent } from './liste-utilisateur/liste-utilisateur.component';
import { RouterModule, Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'liste-utilisateur', component: ListeUtilisateurComponent}
];

@NgModule({
  declarations: [
    ListeUtilisateurComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    RouterModule.forChild(routes),
  ]
})
export class UtilisateurModule { }
