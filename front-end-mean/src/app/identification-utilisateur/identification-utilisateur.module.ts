import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InscriptionComponent } from './inscription/inscription.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';
import { ReinitialiserComponent } from './reinitialiser/reinitialiser.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'inscription', component: InscriptionComponent},
  { path: 'reinitilaserMdp/:id', component: ReinitialiserComponent}
];

@NgModule({
    declarations: [
        LoginComponent,
        InscriptionComponent,
        DragAndDropComponent,
        ReinitialiserComponent
    ],
    exports: [
        DragAndDropComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
    ]
})
export class IdentificationUtilisateurModule { }
