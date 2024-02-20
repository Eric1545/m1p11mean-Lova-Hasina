import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { HistoriqueComponent } from './historique/historique.component';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from '../../template/template.component';
import { EmployeFavorisComponent } from './employe-favoris/employe-favoris.component';
import { ListeProduitComponent } from './liste-produit/liste-produit.component';
import localeFr from '@angular/common/locales/fr';
import { PaginationComponent } from '../../pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { AjouterProduitFavorisComponent } from './ajouter-produit-favoris/ajouter-produit-favoris.component';
import { ListeProduitFavorisComponent } from './liste-produit-favoris/liste-produit-favoris.component';
import { ListeEmployeFavorisComponent } from './liste-employe-favoris/liste-employe-favoris.component';

const routes: Routes = [
  {
    path: 'client',
    component: TemplateComponent,
    children: [
      {
        path: 'historique',
        component: HistoriqueComponent
      },
      {
        path: 'listeProduit',
        component: ListeProduitComponent
      },
      {
        path: 'ajouterServiceFavoris',
        component: AjouterProduitFavorisComponent
      },
      {
        path: 'listeServiceFavoris',
        component: ListeProduitFavorisComponent
      },
      {
        path: 'listeEmployeFavoris',
        component: ListeEmployeFavorisComponent
      },
    ]
  }, 
];

registerLocaleData(localeFr);
@NgModule({
  declarations: [
    HistoriqueComponent,
    EmployeFavorisComponent,
    ListeProduitComponent,
    PaginationComponent,
    AjouterProduitFavorisComponent,
    ListeProduitFavorisComponent,
    ListeEmployeFavorisComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class ClientModule { }
