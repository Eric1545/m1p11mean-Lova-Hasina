import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StatistiquesService} from "../../../services/statistiques.service";
import { Chart } from 'chart.js/auto';



@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit{
  reservation: any = null;
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
    this.reservation = await this.statistiquesService.nbRdvParJoursMois(this.donnee);
    const data = this.reservation.data;
    console.log(data)

    const labels = data.map(function (item: any) {
      return item._id;
    });

    var totalData = data.map(function (item: any) {
      return item.count;
    });

    var hoverInfo = data.map(function (item: any) {
      return "Nombre de reservation: " + item.count;
    });

    // Générez dynamiquement des couleurs en fonction du nombre d'éléments dans le tableau
    const backgroundColors = 'rgb(173, 216, 230)'; // Bleu ciel


    // Vérifiez s'il existe déjà un graphique avec le même ID
    if (this.myChart) {
      this.myChart.destroy(); // Détruisez le graphique précédent
    }

    this.myChart = new Chart("reservationChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: totalData,
          backgroundColor: backgroundColors, // Utilisez les couleurs générées
        }]
      },
      options: {
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
