import * as data from '../../../assets/data.json';
import { CommonModule } from '@angular/common';
import * as local from '../../../assets/landing.json'
import { Component } from '@angular/core';
import axios from 'axios';

interface DataItem {
  date: string;
  ville: string;
  gc_obo_nature_c: string;
  gc_obo_type_c: string;
  gc_obo_nom_recordtype_sc_c: string;
  description: string;
}

@Component({
  selector: 'app-recherche',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.css']
})
export class RechercheComponent {
  
  jsonData: DataItem[] = (data as any).results;
  jsonLocal=local.results;
  annoncesTrouvees: DataItem[] = [];

  etatSelectionne: string = '';
  categorieSelectionnee: string = '';
  lieuSelectionne: string = '';
  descriptionSelectionnee: string = '';
  dateSelectionnee: string = '';
  natureSelectionnee:string = '';

  etatVisible: boolean = false;
  categorieVisible: boolean = false;
  lieuVisible: boolean = false;
  descriptionVisible: boolean = false;
  dateVisible: boolean = false;
  natureVisible: boolean = false;
  afficherAnnonceTrouvee: boolean = false;

  message: string = '';
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

  async comparerDonnees() {
    this.annoncesTrouvees = [];
    let correspondanceTrouvee = false; // Variable pour suivre si une correspondance a été trouvée
  
    // Parcourir les données JSON
    this.jsonData.forEach((obj: DataItem) => {
      // Comparer chaque variable avec la variable sélectionnée dans le formulaire
      if (obj.gc_obo_type_c === this.categorieSelectionnee &&
          obj.ville === this.lieuSelectionne &&
          obj.date === this.dateSelectionnee &&
          obj.gc_obo_nom_recordtype_sc_c === this.etatSelectionne 
          ) {
        // Une correspondance est trouvée
        correspondanceTrouvee = true;
        // Ajouter l'annonce correspondante à la liste d'annonces trouvées
        this.annoncesTrouvees.push(obj);
      }
    });

    // Si une correspondance est trouvée, assignez la première annonce trouvée à annonceSelectionnee
    if (correspondanceTrouvee) {
        this.annonceSelectionnee = this.annoncesTrouvees;
        this.message = "Des annonces similaires ont été trouvées.";
    } else {
        this.message = "Aucune annonce similaire n'a été trouvée.";
    }
}

rechercherAnnonces() {
  this.comparerDonnees();
  this.afficherDetails(this.annonceSelectionnee);
  this.afficherAnnonceTrouvee = true;
}



  getUniqueTypes(): string[] {
    const uniqueNames = new Set<string>();

    this.jsonData.forEach((item: DataItem) => {
      if (item.gc_obo_type_c !== null && item.gc_obo_type_c !== undefined && item.gc_obo_type_c !== '') {
        uniqueNames.add(item.gc_obo_type_c);
      }
    });

    return Array.from(uniqueNames);
  }

  getUniqueNames(): string[] {
    const uniqueNames = new Set<string>();

    this.jsonLocal.forEach(item => {
      if (item.title !== null && item.title !== undefined) {
        uniqueNames.add(item.title);
      }
    });

    return Array.from(uniqueNames);
  }
  getUniqueEtat(): string[] {
    const uniqueNames = new Set<string>();

    this.jsonData.forEach((item: DataItem) => {
      if (item.gc_obo_nom_recordtype_sc_c !== null && item.gc_obo_nom_recordtype_sc_c !== undefined && item.gc_obo_nom_recordtype_sc_c !=='') {
        uniqueNames.add(item.gc_obo_nom_recordtype_sc_c);
      }
    });

    return Array.from(uniqueNames);
  }
  
  onEtatChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.etatSelectionne = target.value;
    console.log("État sélectionné:", this.etatSelectionne);
  }

  onCategorieChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.categorieSelectionnee = target.value;
    console.log("Catégorie sélectionnée:", this.categorieSelectionnee);
  }

  onLieuChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.lieuSelectionne = target.value;
    console.log("Lieu sélectionné:", this.lieuSelectionne);
  }

  
  onDateChange(event: any) {
    const selectedDate = event.target.value;
    let dateToDisplay: string;
    const parsedDate = new Date(selectedDate);
    dateToDisplay = this.getDateString(parsedDate);

    this.dateSelectionnee = dateToDisplay; 
    console.log("Date sélectionnée:", this.dateSelectionnee); 
  }
  getDateString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`
  }
}
