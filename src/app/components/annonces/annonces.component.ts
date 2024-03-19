import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import axios from 'axios'; // Assurez-vous d'avoir installé Axios via npm install axios

@Component({
  selector: 'app-annonces',
  templateUrl: './annonces.component.html',
  standalone: true,
  imports:[CommonModule],
  styleUrls: ['./annonces.component.css']
})
export class AnnoncesComponent {
  annonces: any[] = [];
  annonceSelectionnee: any;

  constructor() {
    // Effectuer une requête HTTP GET pour récupérer les annonces depuis votre serveur
    axios.get('http://localhost:3000/results')
      .then(response => {
        // Une fois que la réponse est reçue, stockez les annonces dans la variable annonces
        this.annonces = response.data.filter((annonce: any) => annonce.gc_obo_nom_recordtype_sc_c === "Perdu")
        .filter((annonce: any)=>annonce.ville!== null)
        .filter((annonce:any)=>annonce.description!==null);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des annonces:', error);
      });
  }
  afficherDetails(annonce: any) {
    this.annonceSelectionnee = annonce;
  }
}
