import { HttpClient } from "@angular/common/http"
import { inject } from "@angular/core"
import { Observable } from "rxjs";
export type BureauResult = {
    results: { gc_obo_gare_origine_r_name: string;
              date: string;
              gc_obo_nature_c:string;
              gc_obo_type_c:string;
              gc_obo_nom_recordtype_sc_c:string; }[];

  };
  
export function getAllBureaux(): Observable<BureauResult> {
    return inject(HttpClient).get<BureauResult>('https://ressources.data.sncf.com/api/explore/v2.1/catalog/datasets/objets-trouves-restitution/records?limit=100');
}
