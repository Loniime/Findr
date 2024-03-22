import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getAllBureaux, BureauResult } from './service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sncf',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sncf.component.html',
  styleUrl: './sncf.component.css'
})
export class SncfComponent {
  bureaux$: Observable<BureauResult>; 

  constructor() {
    this.bureaux$ = getAllBureaux().pipe(
      map((result: BureauResult) => {
        return {
          results: result.results
        };
      })
    );
  }
}