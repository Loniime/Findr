import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as data from '../../../assets/data.json';
import { API } from '../../../assets/interfaceData';
@Component({
  selector: 'app-bureaux',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bureaux.component.html',
  styleUrl: './bureaux.component.css'
})
export class BureauxComponent {
  jsonData= data.results;

  getUniqueNames(): string[] {
    const uniqueNames = new Set<string>();

    this.jsonData.forEach(item => {
      if (item.ville !== null && item.ville !== undefined) { // Vérifier si la valeur est définie
        uniqueNames.add(item.ville);
      }
    });

    return Array.from(uniqueNames);
  }

  getRandomNames(): string[] {
    const uniqueNames = this.getUniqueNames();

    // Mélanger les noms aléatoirement
    const shuffledNames = uniqueNames.sort(() => Math.random() - 0.5);

    // Obtenir les 8 premiers noms aléatoires
    return shuffledNames.slice(0, 8);
  }
}
