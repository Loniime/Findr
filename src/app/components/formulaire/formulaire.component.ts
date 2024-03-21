import { Component, EventEmitter, Output } from '@angular/core';
import * as data from '../../../assets/data.json';
import { CommonModule } from '@angular/common';
import * as local from '../../../assets/landing.json';
import axios from 'axios';
interface DataItem {
  date: string;
  ville: string;
  gc_obo_nature_c: string;
  gc_obo_type_c: string;
  gc_obo_nom_recordtype_sc_c: string;
  description: string;
  adresseMail:string;
}

@Component({
  selector: 'app-formulaire',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent {
  
  jsonData: DataItem[] = (data as any).results;
  jsonLocal= local.results;
  annoncesTrouvees: DataItem[] = [];

  etatSelectionne: string = '';
  categorieSelectionnee: string = '';
  lieuSelectionne: string = '';
  descriptionSelectionnee: string = '';
  dateSelectionnee: string = '';
  natureSelectionnee:string = '';
  email:string='';
  searchCity:string='';
  adresse: string='';

  etatVisible: boolean = false;
  categorieVisible: boolean = false;
  lieuVisible: boolean = false;
  descriptionVisible: boolean = false;
  dateVisible: boolean = false;
  natureVisible: boolean=false;
  emailValide: boolean = true;
  correspondanceTrouvee: boolean = false;

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
          obj.description === this.descriptionSelectionnee && 
          obj.gc_obo_nature_c === this.natureSelectionnee &&
          obj.adresseMail === this.adresse) {
        // Une correspondance est trouvée
        correspondanceTrouvee = true;
      }
    });
  
    // Si aucune correspondance n'a été trouvée, ajouter les valeurs sélectionnées
    if (!correspondanceTrouvee) {
      // Créer un nouvel objet temporaire avec les valeurs sélectionnées
      const nouvelleAnnonce: DataItem = {
        date: this.dateSelectionnee,
        description:this.descriptionSelectionnee,
        ville: this.lieuSelectionne,
        gc_obo_nature_c: this.natureSelectionnee,
        gc_obo_type_c: this.categorieSelectionnee,
        gc_obo_nom_recordtype_sc_c: this.etatSelectionne,
        adresseMail:this.adresse
      };
      // Poussez le nouvel objet dans annoncesTrouvees
      this.annoncesTrouvees.push(nouvelleAnnonce);
      try {
        // Utilisez Axios pour envoyer les données à votre serveur
        const response = await axios.post('http://localhost:3000/results', nouvelleAnnonce);
        console.log(response.data); // Vous pouvez afficher la réponse du serveur si nécessaire
        // Mettez ici le code que vous souhaitez exécuter après l'ajout des données à la base de données
      } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
      }
    }else{
      console.log("L'objet et dans la base déja");
    }
}

  async comparer(): Promise<void> {
    this.verifierAdresseEmail();
    if (!this.isValidEmail(this.adresse)) {
      console.error("Adresse e-mail invalide");
      this.emailValide = false;
      return; // Arrêter l'exécution de la méthode si l'adresse e-mail est invalide
    } else {
      this.emailValide = true;

    }
    
  }
  


  onComplete() {
    this.etatVisible = true;
    this.categorieVisible = true;
    this.lieuVisible = true;
    this.descriptionVisible = true;
    this.dateVisible = true;
    this.natureVisible = true;
    if (this.etatSelectionne === "Trouver") {
      // Afficher un message à l'utilisateur
      console.log("N'hésitez pas à regarder notre section d'objets trouvés pour trouver où déposer cet objet par rapport à votre ville.");
      // Vous pouvez également afficher un message à l'utilisateur en utilisant une boîte de dialogue, une alerte ou un autre moyen.
  } else {
      // Si l'état n'est pas "Trouver", alors vérifier l'adresse e-mail
      this.verifierAdresseEmail();
      if (!this.emailValide) {
          // Arrêter l'exécution de la méthode si l'adresse e-mail est invalide
          return;
      }
  }
  
  }
  isValidEmail(email: string): boolean {
    // Implémentez la logique de validation de l'adresse e-mail selon vos besoins
    // Vous pouvez utiliser des expressions régulières ou d'autres méthodes de validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  verifierAdresseEmail(): void {
    if (!this.isValidEmail(this.adresse)) {
      console.error("Adresse e-mail invalide");
      this.emailValide = false;
      return; // Arrêter l'exécution de la méthode si l'adresse e-mail est invalide
    } else {
      this.emailValide = true;
    }
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
  getUniqueNature(): string[] {
    const uniqueNames = new Set<string>();

    this.jsonData.forEach((item: DataItem) => {
      if (item.gc_obo_nature_c !== null && item.gc_obo_nature_c !== undefined && item.gc_obo_nature_c !== '') {
        uniqueNames.add(item.gc_obo_nature_c);
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
  onAdresse(event:Event){
    const target = event.target as HTMLInputElement;
    this.adresse = target.value;
    console.log("Adresse saisi",this.adresse);
  }

  onDateChange(event: any) {
    const selectedDate = event.target.value;
    let dateToDisplay: string;

    // Gérer les cas de date autres que 'aujourd'hui' et 'hier'
    const parsedDate = new Date(selectedDate);
    dateToDisplay = this.getDateString(parsedDate);

    // Utiliser dateToDisplay comme bon vous semble

    this.dateSelectionnee = dateToDisplay; // Assigner la date sélectionnée à this.dateSelectionnee
    console.log("Date sélectionnée:", this.dateSelectionnee); // Afficher la date sélectionnée dans la console
  }
  getDateString(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}