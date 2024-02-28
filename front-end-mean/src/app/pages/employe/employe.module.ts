import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeEmployeComponent } from './liste-employe/liste-employe.component';
import {RouterModule, Routes} from "@angular/router";
import {TemplateComponent} from "../../template/template.component";
import { AjouterEmployeComponent } from './ajouter-employe/ajouter-employe.component';
import {DataTablesModule} from "angular-datatables";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IdentificationUtilisateurModule} from "../../identification-utilisateur/identification-utilisateur.module";
import { ModifierEmployeComponent } from './modifier-employe/modifier-employe.component';
import { ProfilComponent } from './profil/profil.component';


const routes: Routes = [
  {
    path: 'employe',
    component: TemplateComponent,
    children: [
      {
        path: 'liste',
        component: ListeEmployeComponent
      },
      {
        path: 'ajouter',
        component: AjouterEmployeComponent
      },
      {
        path: 'modifier/:id',
        component: ModifierEmployeComponent
      },
      {
        path: 'profil',
        component: ProfilComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    ListeEmployeComponent,
    AjouterEmployeComponent,
    ModifierEmployeComponent,
    ProfilComponent
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
export class EmployeModule { }
