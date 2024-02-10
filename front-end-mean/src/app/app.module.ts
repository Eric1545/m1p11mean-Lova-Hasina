import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IdentificationUtilisateurModule } from './identification-utilisateur/identification-utilisateur.module';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    UtilisateurModule,
    IdentificationUtilisateurModule,
    MatPaginatorModule,
    AppRoutingModule//ito atao farany foana
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
