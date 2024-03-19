import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as data from '../../../assets/data.json';
import * as local from '../../../assets/landing.json'

interface DataItem {
  officeAddress: string;
  phoneNumber: string;
  officeName: string;
  officeHours: string;
  title:string;
}

@Component({
  selector: 'app-bureaux',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bureaux.component.html',
  styleUrl: './bureaux.component.css'
})
export class BureauxComponent {
  jsonData = data.results;
  jsonLocal: DataItem[] = (local as any).results;
  uniqueNames: string[] = [];
  etatSelectionne: string = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.setUniqueNames();
    });
  }

  setUniqueNames() {
    this.uniqueNames = this.getUniqueNames();
    this.cdr.detectChanges();
  }

  getUniqueNames(): string[] {
    const uniqueNames = new Set<string>();

    this.jsonData.forEach(item => {
      if (item.ville !== null && item.ville !== undefined) {
        uniqueNames.add(item.ville);
      }
    });

    return Array.from(uniqueNames).slice(0, 8);
  }

  getVille(){
    const uniqueNames = new Set<string>();

    this.jsonLocal.forEach(item => {
      if (item.title !== null && item.title!== undefined) {
        uniqueNames.add(item.title);
      }
    });

    return Array.from(uniqueNames).slice(0, 8);
    
  }
 
  
  /*onCategorieChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    officeAddress=this.etatSelectionne;
    this.etatSelectionne = target.value;
    console.log("Catégorie sélectionnée:", this.etatSelectionne);
  }*/

  /*getRandomNames(): string[] {
    const shuffledNames = this.uniqueNames.sort(() => Math.random() - 0.5);
    return shuffledNames.slice(0, 8);
  }*/
}
