import { Component, Directive, HostListener } from '@angular/core';
import { SectionComponent } from '../section/section.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-masterhead',
  standalone: true,
  imports: [SectionComponent,CommonModule],
  templateUrl: './masterhead.component.html',
  styleUrl: './masterhead.component.css'
})
export class MasterheadComponent {

  showSection: boolean = false;

  onGetStarted() {
    this.showSection = true;
  }
   

}
