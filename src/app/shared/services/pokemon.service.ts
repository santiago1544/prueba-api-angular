import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../components/interfaces/info_pokemon';
import { environment1 } from '@environment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private http: HttpClient) {}

  // Lista de pokemones
  getAllPokemons(): Observable<any> {
    return this.http.get<any>(`${environment1.urlAPI}?limit=10000&offset=0`);
  }

  // Detalle de un pokemon por id o nombre
  getPokemon(id: number | string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment1.urlAPI}/${id}`);
  }

    getPokemonByUrl(url: string): Observable<Pokemon> {
        return this.http.get<Pokemon>(url);
    }
}
