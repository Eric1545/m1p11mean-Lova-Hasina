import { Component } from '@angular/core';

@Component({
  selector: 'app-liste-utilisateur',
  templateUrl: './liste-utilisateur.component.html',
  styleUrls: ['./liste-utilisateur.component.css']
})
export class ListeUtilisateurComponent {
  onPageChange(event: any) {
    // Vous pouvez mettre à jour vos données ou effectuer d'autres actions ici
    console.log('Changement de page:', event);
  }
}
