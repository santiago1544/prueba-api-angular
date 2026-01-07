import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';

import { Personaje } from '@shared/components/interfaces/info_personajes';
import { environment } from '@environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PersonajeService {

  private apiPageCache = new Map<string, Personaje[]>();
  private totalCount = 0;

  constructor(private http: HttpClient) { }

  detalles(id: number) {
    return this.http.get<Personaje>(`${environment.urlAPI}/${id}`);
  }
  
  getPersonajesSubPage(
    subPageIndex: number,
    subPageSize: number,
    query = ''
  ): Observable<{ personajes: Personaje[]; total: number }> {
    if (subPageSize > 20) subPageSize = 20;

    const requestedStart = subPageIndex * subPageSize;
    const requestedEnd = requestedStart + subPageSize - 1;

    const apiPageStart = Math.floor(requestedStart / 20) + 1;
    const apiPageEnd = Math.floor(requestedEnd / 20) + 1;

    const pagesNeeded: number[] = [];
    for (let p = apiPageStart; p <= apiPageEnd; p++) {
      pagesNeeded.push(p);
    }

    const requests = pagesNeeded.map((p) => {
      const cacheKey = `${p}-${query}`;
      if (this.apiPageCache.has(cacheKey)) {
        return of({
          page: p,
          results: this.apiPageCache.get(cacheKey)!,
          info: null
        });
      } else {
        const url = `${environment.urlAPI}/?page=${p}${
          query ? `&name=${query}` : ''
        }`;

        return this.http.get<any>(url).pipe(
          map((res) => ({
            page: p,
            results: res.results || [],
            info: res.info
          })),
          tap((r) => {
            this.apiPageCache.set(cacheKey, r.results);
            if (r.info?.count) {
              this.totalCount = r.info.count;
            }
          }),
          catchError((err) => {
            console.error(`Error cargando página API ${p}`, err);
            return of({ page: p, results: [], info: null });
          })
        );
      }
    });

    return forkJoin(requests).pipe(
      map((parts) => {
        parts.sort((a, b) => a.page - b.page);

        const combinedResults: Personaje[] = parts.reduce(
          (acc: Personaje[], cur) => acc.concat(cur.results),
          []
        );

        const offsetInCombined = requestedStart - (apiPageStart - 1) * 20;
        const slice = combinedResults.slice(
          offsetInCombined,
          offsetInCombined + subPageSize
        );

        return {
          personajes: slice,
          total: this.totalCount
        };
      })
    );
  }

  getRandomPersonajes(limit: number): Observable<{ personajes: Personaje[]; total: number }> {
  return this.http.get<any>(`${environment.urlAPI}`).pipe(
    switchMap((res) => {
      const total = res.info.count;
      const randomIds = Array.from({ length: limit }, () =>
        Math.floor(Math.random() * total) + 1
      );

      return this.http.get<any>(`${environment.urlAPI}/${randomIds.join(',')}`).pipe(
        map((personajes: any | any[]) => {
          // Si la API devuelve un objeto (1 personaje) lo convertimos en array
          const results = Array.isArray(personajes) ? personajes : [personajes];
          return { personajes: results, total };
        })
      );
    })
  );
}


  clearCache() {
    this.apiPageCache.clear();
    this.totalCount = 0;
  }

  getPersonajes():  Observable<any[]> {
    return this.http.get<Personaje[]>(`${environment.urlAPI}`);
  }
}