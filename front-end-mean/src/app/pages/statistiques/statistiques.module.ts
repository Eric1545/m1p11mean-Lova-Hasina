import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationComponent } from './reservation/reservation.component';
import {RouterModule, Routes} from "@angular/router";
import {TemplateComponent} from "../../template/template.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ChiffreAffaireComponent } from './chiffre-affaire/chiffre-affaire.component';


const routes: Routes = [
  {
    path: 'statistiques',
    component: TemplateComponent,
    children: [
      {
        path: 'reservation',
        component: ReservationComponent
      },
      {
        path: 'chiffre-affaire',
        component: ChiffreAffaireComponent
      },
    ]
  },
];

@NgModule({
  declarations: [
    ReservationComponent,
    ChiffreAffaireComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class StatistiquesModule { }
