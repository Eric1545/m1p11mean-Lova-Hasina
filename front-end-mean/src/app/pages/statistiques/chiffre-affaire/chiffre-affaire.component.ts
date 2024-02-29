import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StatistiquesService} from "../../../services/statistiques.service";
import {Chart} from "chart.js/auto";

@Component({
  selector: 'app-chiffre-affaire',
  templateUrl: './chiffre-affaire.component.html',
  styleUrls: ['./chiffre-affaire.component.css']
})
export class ChiffreAffaireComponent implements OnInit{
  chiffreAffaire: any = null;
  donnee : any = {
    "mois": null,
    "annee": null
  }
  mois: any = null;
  annee: any = null;
  private myChart: any;

  constructor(private router:Router, private statistiquesService: StatistiquesService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    const date = new Date();
    this.donnee.mois = date.getUTCMonth() + 1;
    this.donnee.annee = date.getFullYear();
    await this.generateChart()
  }

  async generateChart() {
    console.log(this.donnee.mois)
    console.log(this.donnee.annee)
    this.donnee.mois = parseInt(this.donnee.mois, 10);
    this.donnee.annee = parseInt(this.donnee.annee, 10);
    this.chiffreAffaire = await this.statistiquesService.chiffreAffaireJoursMois(this.donnee);
    const data = this.chiffreAffaire.data;

    const labels = data.map(function (item: any) {
      return item._id;
    });

    var totalData = data.map(function (item: any) {
      return item.chiffre_affaire;
    });

    var hoverInfo = data.map(function (item: any) {
      return "Chiffre affaire: " + item.chiffre_affaire;
    });

    // Générez dynamiquement des couleurs en fonction du nombre d'éléments dans le tableau
    const backgroundColors = 'rgb(173, 216, 230)'; // Bleu ciel


    // Vérifiez s'il existe déjà un graphique avec le même ID
    if (this.myChart) {
      this.myChart.destroy(); // Détruisez le graphique précédent
    }

    this.myChart = new Chart("chiffreAffaireChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: totalData,
          backgroundColor: backgroundColors, // Utilisez les couleurs générées
        }]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Jours ou Mois', // Remplacez par le titre que vous souhaitez
            },
          },
          y: {
            title: {
              display: true,
              text: 'Chiffre d\'affaire', // Remplacez par le titre que vous souhaitez
            },
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const label = labels[context.dataIndex];
                const info = hoverInfo[context.dataIndex];
                return label + ": " + context.parsed + " (" + info + ")";
              }
            }
          }
        }
      }
    });
  }

  async changerChart() {
    await this.generateChart();
  }
}
