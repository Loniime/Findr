import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {SectionComponent} from './components/section/section.component';
import {FormulaireComponent} from './components/formulaire/formulaire.component';
import { AideComponent } from './components/aide/aide.component';
import { BureauxComponent } from './components/bureaux/bureaux.component';
import { AnnoncesComponent } from './components/annonces/annonces.component';
import { ContactComponent } from './components/contact/contact.component';
import { MasterheadComponent } from './components/masterhead/masterhead.component';
import { CommonModule } from '@angular/common';
import { RechercheComponent } from './components/recherche/recherche.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    SectionComponent,
    FormulaireComponent,
    AideComponent,
    BureauxComponent,
    AnnoncesComponent,
    ContactComponent,
    MasterheadComponent,
    CommonModule,
    RechercheComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dashprojet';
  
}
