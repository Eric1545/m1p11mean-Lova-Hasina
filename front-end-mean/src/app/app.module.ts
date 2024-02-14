import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { IdentificationUtilisateurModule } from './identification-utilisateur/identification-utilisateur.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TemplateComponent } from './template/template.component';
import { ContainerComponent } from './template/container/container.component';
import { FooterComponent } from './template/footer/footer.component';
import { NavbarComponent } from './template/navbar/navbar.component';
import { SidebarComponent } from './template/sidebar/sidebar.component';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    TemplateComponent,
    ContainerComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    UtilisateurModule,
    IdentificationUtilisateurModule,
    MatPaginatorModule,
    AppRoutingModule,
    NgOptimizedImage,
//ito atao farany foana
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
