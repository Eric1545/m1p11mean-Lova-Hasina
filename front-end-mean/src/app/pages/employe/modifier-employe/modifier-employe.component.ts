import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {EmployeService} from "../../../services/employe.service";

@Component({
  selector: 'app-modifier-employe',
  templateUrl: './modifier-employe.component.html',
  styleUrls: ['./modifier-employe.component.css']
})
export class ModifierEmployeComponent implements OnInit {
  employeModifie: any = {
    nom: null,
    prenom: null,
    email:null,
    username: null,
    password:null,
    image_url:null
  };
  loading: boolean = false;
  id: any;

  constructor(private router:Router, private employeService : EmployeService, private route: ActivatedRoute){
  }

  ngOnInit() {
    // Récupérer le paramètre 'id' de l'URL
    this.id = this.route.snapshot.params['id'];
    return this.obtenirEmployeParId();
  }


  async obtenirEmployeParId() {
    try {
      const result = await this.employeService.obtenirCompteParId(this.id);
      console.log(result.data)
      this.employeModifie = result.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des employes :', error);
    }
  }

  async modifierEmploye(): Promise<void> {
    try {
      const employeModifie = await this.employeService.mettreAJourEmploye(this.employeModifie);
      await this.router.navigate(['/employe/liste']);
    } catch (error) {
      console.error('Erreur lors de la modification de l\'employe :', error);
    }
  }

  handleFileUpload(file: File){
    this.employeModifie.image_url = file.name
  }


}
