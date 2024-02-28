import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TempsMoyenComponent } from './temps-moyen/temps-moyen.component';
import { TemplateComponent } from 'src/app/template/template.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'stat',
    component: TemplateComponent,
    children: [
      {
        path: 'tempsMoyen',
        component: TempsMoyenComponent
      }
    ]
  }, 
];

@NgModule({
  declarations: [
    TempsMoyenComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class StatModule { }
