import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoriqueComponent } from './historique/historique.component';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from '../template/template.component';
import { EmployeFavorisComponent } from './employe-favoris/employe-favoris.component';
import { ListeProduitComponent } from './liste-produit/liste-produit.component';

const routes: Routes = [
  {
    path: 'historique',
    component: TemplateComponent,
    children: [
      {
        path: '',
        component: HistoriqueComponent
      }
    ]
  }, 
  {
    path: 'listeproduit',
    component: TemplateComponent,
    children: [
      {
        path: '',
        component: ListeProduitComponent
      }
    ]
  }, 
];

@NgModule({
  declarations: [
    HistoriqueComponent,
    EmployeFavorisComponent,
    ListeProduitComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ClientModule { }
