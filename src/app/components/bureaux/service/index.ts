import { HttpClient } from "@angular/common/http"
import { inject } from "@angular/core"
import { Observable } from "rxjs";
export type BureauResult = {
    results: { gc_obo_gare_origine_r_name: string; }[];
  };
  
export function getAllBureaux(): Observable<BureauResult> {
    return inject(HttpClient).get<BureauResult>('https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/objets-trouves-restitution/records?select=gc_obo_gare_origine_r_name&group_by=gc_obo_gare_origine_r_name&limit=100&refine=gc_obo_date_heure_restitution_c%3A%222024%22');
}
