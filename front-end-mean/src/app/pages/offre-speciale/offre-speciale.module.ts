import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjouterOffreSpecialeComponent } from './ajouter-offre-speciale/ajouter-offre-speciale.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {TemplateComponent} from "../../template/template.component";
import { ListeOffreSpecialeComponent } from './liste-offre-speciale/liste-offre-speciale.component';
import {DataTablesModule} from "angular-datatables";
import { ModifierOffreSpecialeComponent } from './modifier-offre-speciale/modifier-offre-speciale.component';


const routes: Routes = [
  {
    path: 'offre-speciale',
    component: TemplateComponent,
    children: [
      {
        path: 'ajouter',
        component: AjouterOffreSpecialeComponent
      },
      {
        path: 'liste',
        component: ListeOffreSpecialeComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierOffreSpecialeComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    AjouterOffreSpecialeComponent,
    ListeOffreSpecialeComponent,
    ModifierOffreSpecialeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule
  ]
})
export class OffreSpecialeModule { }
