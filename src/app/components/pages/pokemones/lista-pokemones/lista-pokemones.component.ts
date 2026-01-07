import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Location } from '@angular/common';
import { Pokemon } from '@app/shared/components/interfaces/info_pokemon';
import { PokemonService } from '@app/shared/services/pokemon.service';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lista-pokemones',
  templateUrl: './lista-pokemones.component.html',
  styleUrls: ['./lista-pokemones.component.scss']
})
export class ListaPokemonesComponent implements OnInit {
  pokemones: Pokemon[] = [];
  displayedColumns: string[] = ['imagen', 'nombre', 'tipos', 'experiencia'];

  totalPokemones = 0;
  pageSize = 20;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private pokemonService: PokemonService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
     this.route.queryParams.subscribe((params) => {
      const query = params['q'] || '';
      if (query) {
        this.buscarPokemon(query);
      } else {
        this.cargarPokemones();
      }
    });
  }

  /**
   * Cargar los pokemones desde la API
   */
  cargarPokemones(): void {
    this.pokemonService.getAllPokemons().subscribe(data => {
      this.totalPokemones = data.results.length;

      // Calcular offset para la página actual
      const offset = this.pageIndex * this.pageSize;
      const currentPage = data.results.slice(offset, offset + this.pageSize);

      // Hacer requests en paralelo para obtener el detalle de cada Pokémon
      forkJoin(
        currentPage.map((p: any) => this.pokemonService.getPokemonByUrl(p.url))
      ).subscribe((pokemons: Pokemon[]) => {
        this.pokemones = pokemons.map(p => ({
          id: p.id,
          name: p.name,
          sprites: p.sprites,
          types: p.types,
          base_experience: p.base_experience,
          abilities: p.abilities,
          height: p.height,
          weight: p.weight,
          stats: p.stats
        }));
      });
    });
  }

  buscarPokemon(nombre: string) {
    this.pokemonService.getPokemon(nombre).subscribe((res) => {
      this.pokemones = [res]; // Devuelve un único Pokémon
    });
  }

  /**
   * Paginador
   */
  onPageChange(event: PageEvent): void {
    this.pageSize = Math.min(event.pageSize, 20);
    this.pageIndex = event.pageIndex;
    this.cargarPokemones();
  }

  volver(): void {
    this.location.back();
  }
}
