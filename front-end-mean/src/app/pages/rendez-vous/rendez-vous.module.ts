import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjouterAuPanierComponent } from './ajouter-au-panier/ajouter-au-panier.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {TemplateComponent} from "../../template/template.component";
import {ListeEmployeComponent} from "../employe/liste-employe/liste-employe.component";
import {AjouterEmployeComponent} from "../employe/ajouter-employe/ajouter-employe.component";
import {ModifierEmployeComponent} from "../employe/modifier-employe/modifier-employe.component";
import { AjouterRendezVousComponent } from './ajouter-rendez-vous/ajouter-rendez-vous.component';
import {IdentificationUtilisateurModule} from "../../identification-utilisateur/identification-utilisateur.module";
import {DataTablesModule} from "angular-datatables";
import { ListeRendezVousComponent } from './liste-rendez-vous/liste-rendez-vous.component';
import { RendezVousTerminerComponent } from './rendez-vous-terminer/rendez-vous-terminer.component';


const routes: Routes = [
  {
    path: 'rendez-vous',
    component: TemplateComponent,
    children: [
      {
        path: 'ajouter-au-panier',
        component: AjouterAuPanierComponent
      },
      {
        path: 'ajouter',
        component: AjouterRendezVousComponent
      },
      {
        path: 'liste',
        component: ListeRendezVousComponent
      },
      {
        path: 'terminer',
        component: RendezVousTerminerComponent
      },
    ]
  },
];

@NgModule({
  declarations: [
    AjouterAuPanierComponent,
    AjouterRendezVousComponent,
    ListeRendezVousComponent,
    RendezVousTerminerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    IdentificationUtilisateurModule,
    DataTablesModule
  ]
})
export class RendezVousModule { }
