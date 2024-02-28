import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OffreSpecialeService} from "../../../services/offre-speciale.service";
import {ServiceService} from "../../../services/service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajouter-offre-speciale',
  templateUrl: './ajouter-offre-speciale.component.html',
  styleUrls: ['./ajouter-offre-speciale.component.css']
})
export class AjouterOffreSpecialeComponent implements OnInit{

  offreSpecialeForm!: FormGroup;
  services: any[] = [];
  servicesChoisi: any[] = [];
  reductionChoisi: any[] = [];

  constructor(private router:Router, private offreSpecialeService: OffreSpecialeService, private serviceService: ServiceService, private fb: FormBuilder) {}

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
  }

  async ajouterOffreSpeciale() {
    try {
      const form = this.offreSpecialeForm.value
      const data = {
        "nom": form.nom,
        "description": form.description,
        "date_debut": form.dateDebut,
        "date_fin": form.dateFin,
        "liste_service": this.servicesChoisi.map(item => item._id),
        "liste_reduction": this.reductionChoisi
      };
      const offreSpecialeAjouter = await this.offreSpecialeService.ajouterOffreSpeciale(data);

      const messageSucces = offreSpecialeAjouter.message;
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
