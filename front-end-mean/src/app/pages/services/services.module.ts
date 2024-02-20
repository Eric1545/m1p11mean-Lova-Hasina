import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeServicesComponent } from './liste-services/liste-services.component';
import {RouterModule, Routes} from "@angular/router";
import {TemplateComponent} from "../../template/template.component";
import {DataTablesModule} from "angular-datatables";
import { AjouterServicesComponent } from './ajouter-services/ajouter-services.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


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
      }
    ]
  },
];

@NgModule({
  declarations: [
    ListeServicesComponent,
    AjouterServicesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ServicesModule { }
