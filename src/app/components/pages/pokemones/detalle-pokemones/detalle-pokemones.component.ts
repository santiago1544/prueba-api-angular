import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Observable, take } from 'rxjs';
import { Pokemon } from '@app/shared/components/interfaces/info_pokemon';
import { PokemonService } from '@app/shared/services/pokemon.service';

@Component({
  selector: 'app-detalle-pokemones',
  templateUrl: './detalle-pokemones.component.html',
  styleUrls: ['./detalle-pokemones.component.scss']
})
export class DetallePokemonesComponent implements OnInit {
  pokemon$: Observable<Pokemon>; 

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params) => {
      const id = params['id'];
      this.pokemon$ = this.pokemonService.getPokemon(id);
    });
  }

  volver(): void {
    this.location.back();
  }
}
