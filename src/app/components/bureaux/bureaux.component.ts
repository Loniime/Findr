import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAllBureaux, BureauResult } from './service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bureaux',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bureaux.component.html',
  styleUrl: './bureaux.component.css'
})
export class BureauxComponent {
  bureaux$: Observable<BureauResult>; 

  constructor() {
    this.bureaux$ = getAllBureaux().pipe(
      map((result: BureauResult) => {
        return {
          results: result.results.slice(0, 8) 
        };
      })
    );
  }
}
