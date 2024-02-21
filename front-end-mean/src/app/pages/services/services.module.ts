import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeServicesComponent } from './liste-services/liste-services.component';
import {RouterModule, Routes} from "@angular/router";
import {TemplateComponent} from "../../template/template.component";
import {DataTablesModule} from "angular-datatables";
import { AjouterServicesComponent } from './ajouter-services/ajouter-services.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IdentificationUtilisateurModule} from "../../identification-utilisateur/identification-utilisateur.module";
import { ModifierServicesComponent } from './modifier-services/modifier-services.component';


const routes: Routes = [
  {
    path: 'service',
    component: TemplateComponent,
    children: [
      {
        path: 'liste',
        component: ListeServicesComponent
      },
      {
        path: 'ajouter',
        component: AjouterServicesComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierServicesComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    ListeServicesComponent,
    AjouterServicesComponent,
    ModifierServicesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    IdentificationUtilisateurModule,
  ]
})
export class ServicesModule { }
