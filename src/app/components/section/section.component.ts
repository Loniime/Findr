import { Component } from '@angular/core';
import { FormulaireComponent } from '../formulaire/formulaire.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-section',
  standalone: true,
  imports:[FormulaireComponent,CommonModule],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {
  showSection: boolean = false;

  onGetStarted() {
    this.showSection = true;
  }
}
