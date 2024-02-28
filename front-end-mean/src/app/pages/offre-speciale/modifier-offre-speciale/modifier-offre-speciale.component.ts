import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OffreSpecialeService} from "../../../services/offre-speciale.service";
import {ServiceService} from "../../../services/service.service";

@Component({
  selector: 'app-modifier-offre-speciale',
  templateUrl: './modifier-offre-speciale.component.html',
  styleUrls: ['./modifier-offre-speciale.component.css']
})
export class ModifierOffreSpecialeComponent implements OnInit{

  offreSpecialeForm!: FormGroup;
  services: any[] = [];
  servicesChoisi: any[] = [];
  reductionChoisi: any[] = [];
  offreSpecialeAModifie: any;
  id: any;

  constructor(private router:Router, private offreSpecialeService: OffreSpecialeService, private fb: FormBuilder, private route: ActivatedRoute, private serviceService: ServiceService) {}

  async ngOnInit() {
    this.offreSpecialeForm = this.fb.group({
      nom: ['', Validators.required],
      description: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      service: [null, Validators.required],
      reduction: ['', Validators.required],
    });

    this.services = await this.serviceService.obtenirServices();

    this.id = this.route.snapshot.params['id'];
    const offreSpeciale = await this.offreSpecialeService.obtenirOffreSpecialeParId(this.id);
    console.log(offreSpeciale)
    this.offreSpecialeAModifie = offreSpeciale.data.data;
    this.servicesChoisi = this.offreSpecialeAModifie.liste_service;
    this.reductionChoisi = this.offreSpecialeAModifie.liste_reduction;
    this.services = this.services.filter(s => !this.servicesChoisi.some(sc => sc._id === s._id));

    this.offreSpecialeForm.patchValue({
      nom: this.offreSpecialeAModifie.nom,
      description: this.offreSpecialeAModifie.description,
      dateDebut: this.offreSpecialeAModifie.date_debut,
      dateFin: this.offreSpecialeAModifie.date_fin,
    });
  }

  async modifierOffreSpeciale() {
    try {
      const form = this.offreSpecialeForm.value

      this.offreSpecialeAModifie.nom = form.nom;
      this.offreSpecialeAModifie.description = form.description;
      this.offreSpecialeAModifie.date_debut = form.date_debut;
      this.offreSpecialeAModifie.date_fin = form.date_fin;
      this.offreSpecialeAModifie.liste_service = this.servicesChoisi.map(item => item._id);
      this.offreSpecialeAModifie.liste_reduction = this.reductionChoisi;


      const offreSpecialeModifie = await this.offreSpecialeService.mettreAJourOffreSpeciale(this.offreSpecialeAModifie);

      const messageSucces = offreSpecialeModifie.message;
      await this.router.navigate(['/offre-speciale/liste'], { queryParams: { messageSucces } });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'offre speciale :', error);
    }
  }

  addService() {
    const selectedService = this.offreSpecialeForm.get('service')?.value;

    if (selectedService) {
      this.servicesChoisi.push(selectedService);
      this.services = this.services.filter(service => service !== selectedService);

      const reductionValue = this.offreSpecialeForm.get('reduction')?.value;

      console.log(reductionValue)
      this.reductionChoisi.push(reductionValue);
      const initialReductionValue = '';
      this.offreSpecialeForm.get('reduction')?.setValue(initialReductionValue);
    }
    this.offreSpecialeForm.get('service')?.setValue(null);
  }


  removeService(index: number) {
    this.services.push(this.servicesChoisi[index]);

    this.servicesChoisi.splice(index, 1);
    this.reductionChoisi.splice(index, 1);
  }
}
