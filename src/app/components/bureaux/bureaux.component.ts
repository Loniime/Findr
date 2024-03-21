import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as data from '../../../assets/data.json';
import * as local from '../../../assets/landing.json';

interface DataItem {
  officeAddress: string;
  phoneNumber: string;
  officeName: string;
  officeHours: string;
  title: string;
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
  searchCity: string = '';
  bureauName: string = '';
  horaire: string='';
  adresse: string='';
  numero:string='';
  email:string='';
  joursSemaine: string[] = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  showSecBureau: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  

 

  getUniqueNames(): string[] {
    const uniqueNames = new Set<string>();

    this.jsonLocal.forEach(item => {
      if (item.title !== null && item.title !== undefined) {
        uniqueNames.add(item.title);
      }
    });

    return Array.from(uniqueNames);
  }
  
  showSecBureauOnClick() {
    this.showSecBureau = true;
  }
  showSecBureauOnSearch() {
    
    this.showSecBureau = true;
  }

  onSearchCity(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchCity = target.value.trim(); // Supprimer les espaces au début et à la fin de la chaîne de recherche

    // Vérifier si la ville saisie correspond à un item.title dans jsonLocal
    const foundCity = this.jsonLocal.find(item => item.title === this.searchCity);

    if (foundCity) {
      console.log("La ville existe :", this.searchCity);
      this.bureauName = foundCity.officeName; // Assigner le nom du bureau trouvé à la propriété bureauName
      this.adresse=foundCity.officeAddress;
      this.horaire=foundCity.officeHours;
      this.numero=foundCity.phoneNumber;
      console.log("Nom du bureau :", this.bureauName);
      console.log("Hoaire:",this.horaire);
      console.log("Numero",this.numero);
      console.log("Adresse:",this.adresse);
      // Ajoutez ici le reste de la logique si nécessaire
    } else {
      console.log("La ville n'existe pas :", this.searchCity);
      // Afficher un message à l'utilisateur indiquant que la ville n'existe pas
    }
  }
  onSearchCityFromButton(name: string) {
    // Créer un événement simulé avec le nom de la ville comme valeur cible
    const event = { target: { value: name } } as unknown as Event;
    // Appeler la méthode onSearchCity avec l'événement simulé
    this.onSearchCity(event);
  }

}
