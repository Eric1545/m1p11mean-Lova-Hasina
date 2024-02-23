import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AjouterOffreSpecialeComponent } from './ajouter-offre-speciale/ajouter-offre-speciale.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {TemplateComponent} from "../../template/template.component";


const routes: Routes = [
  {
    path: 'offre-speciale',
    component: TemplateComponent,
    children: [
      {
        path: 'ajouter',
        component: AjouterOffreSpecialeComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    AjouterOffreSpecialeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class OffreSpecialeModule { }
