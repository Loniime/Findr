import { Component, ElementRef, ViewChild } from '@angular/core';
import * as data from '../../../assets/data.json';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent {
  jsonData = data.results;
  etatSelectionne: string = '';
  categorieSelectionnee: string = '';
  lieuSelectionne: string = '';
  descriptionSelectionnee: string = '';
  dateSelectionnee: string = '';

  etatVisible: boolean = false;
  categorieVisible: boolean = false;
  lieuVisible: boolean = false;
  descriptionVisible: boolean = false;
  dateVisible: boolean = false;

  

  onComplete() {
    this.etatVisible = true;
    this.categorieVisible = true;
    this.lieuVisible = true;
    this.descriptionVisible = true;
    this.dateVisible = true;
  }

  getUniqueTypes(): string[] {
    const uniqueNames = new Set<string>();

    this.jsonData.forEach(item => {
      if (item.gc_obo_type_c !== null && item.gc_obo_type_c !== undefined) {
        uniqueNames.add(item.gc_obo_type_c);
      }
    });

    return Array.from(uniqueNames);
  }

  getUniqueNames(): string[] {
    const uniqueNames = new Set<string>();

    this.jsonData.forEach(item => {
      if (item.ville !== null && item.ville !== undefined) {
        uniqueNames.add(item.ville);
      }
    });

    return Array.from(uniqueNames);
  }

  onEtatChange(value: string) {
    this.etatSelectionne = value;
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

  onDesChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.descriptionSelectionnee = target.value;
    console.log("Description sélectionné:", this.descriptionSelectionnee);
  }

  onDateChange(event: any) {
    const selectedDate = event.target.value;
    let dateToDisplay: string;

    switch (selectedDate) {
      case 'Aujourd\'hui':
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
    return `${year}-${month}-${day}`;
  }

}
