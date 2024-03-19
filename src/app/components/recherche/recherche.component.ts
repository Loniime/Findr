import * as data from '../../../assets/data.json';
import { CommonModule } from '@angular/common';
import axios from 'axios';
import { Component } from '@angular/core';

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

  message: string = '';

  constructor() { }

  async comparerDonnees() {
    this.annoncesTrouvees = [];
    let correspondanceTrouvee = false; // Variable pour suivre si une correspondance a été trouvée
  
    // Parcourir les données JSON
    this.jsonData.forEach((obj: DataItem) => {
      // Comparer chaque variable avec la variable sélectionnée dans le formulaire
      if (obj.gc_obo_type_c === this.categorieSelectionnee &&
          obj.ville === this.lieuSelectionne &&
          obj.date === this.dateSelectionnee &&
          obj.gc_obo_nom_recordtype_sc_c===this.etatSelectionne) {
        // Une correspondance est trouvée
        correspondanceTrouvee = true;
      }
    });
  
    // Si une correspondance est trouvée, définissez le message approprié
    if (correspondanceTrouvee) {
        this.message = "Des annonces similaires ont été trouvées.";
    } else {
        this.message = "Aucune annonce similaire n'a été trouvée.";
    }
}

  onComplete() {
    this.etatVisible = true;
    this.categorieVisible = true;
    this.lieuVisible = true;
    this.descriptionVisible = true;
    this.dateVisible = true;
    this.natureVisible = true;
  }

  getUniqueTypes(): string[] {
    const uniqueNames = new Set<string>();

    this.jsonData.forEach((item: DataItem) => {
      if (item.gc_obo_type_c !== null && item.gc_obo_type_c !== undefined) {
        uniqueNames.add(item.gc_obo_type_c);
      }
    });

    return Array.from(uniqueNames);
  }

  getUniqueNames(): string[] {
    const uniqueNames = new Set<string>();

    this.jsonData.forEach((item: DataItem) => {
      if (item.ville !== null && item.ville !== undefined) {
        uniqueNames.add(item.ville);
      }
    });

    return Array.from(uniqueNames);
  }
  getUniqueNature(): string[] {
    const uniqueNames = new Set<string>();

    this.jsonData.forEach((item: DataItem) => {
      if (item.gc_obo_nature_c !== null && item.gc_obo_nature_c !== undefined) {
        uniqueNames.add(item.gc_obo_nature_c);
      }
    });

    return Array.from(uniqueNames);
  }
  getUniqueEtat(): string[] {
    const uniqueNames = new Set<string>();

    this.jsonData.forEach((item: DataItem) => {
      if (item.gc_obo_nom_recordtype_sc_c !== null && item.gc_obo_nom_recordtype_sc_c !== undefined) {
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
  onNatureChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.natureSelectionnee = target.value;
    console.log("Catégorie sélectionnée:", this.natureSelectionnee);
  }

  onLieuChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.lieuSelectionne = target.value;
    console.log("Lieu sélectionné:", this.lieuSelectionne);
  }

  onDesChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.descriptionSelectionnee = target.value;
    console.log("Description sélectionné:", this.descriptionSelectionnee);
  }
  
  onDateChange(event: any) {
    const selectedDate = event.target.value;
    let dateToDisplay: string;

    switch (selectedDate) {
      case 'today':
        dateToDisplay = this.getDateString(new Date());
        break;
      case 'Hier':
        const hier = new Date();
        hier.setDate(hier.getDate() - 1);
        dateToDisplay = this.getDateString(hier);
        break;
      default:
        const parsedDate = new Date(selectedDate);
        dateToDisplay = this.getDateString(parsedDate);
        break;
    }

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
