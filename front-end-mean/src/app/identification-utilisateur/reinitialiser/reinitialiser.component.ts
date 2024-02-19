import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reinitialiser',
  templateUrl: './reinitialiser.component.html',
  styleUrls: ['./reinitialiser.component.css']
})
export class ReinitialiserComponent {
  id: string | undefined;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']; // Récupérer l'ID de l'URL
      console.log(this.id); // Afficher l'ID dans la console à des fins de débogage
    });
  }
}
  