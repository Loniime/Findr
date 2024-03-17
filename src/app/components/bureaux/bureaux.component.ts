import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as data from '../../../assets/data.json';

@Component({
  selector: 'app-bureaux',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bureaux.component.html',
  styleUrl: './bureaux.component.css'
})
export class BureauxComponent {
  jsonData = data.results;
  uniqueNames: string[] = [];

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

  /*getRandomNames(): string[] {
    const shuffledNames = this.uniqueNames.sort(() => Math.random() - 0.5);
    return shuffledNames.slice(0, 8);
  }*/
}
