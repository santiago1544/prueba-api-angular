import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { Pokemon } from "@app/shared/components/interfaces/info_pokemon";

@Component({
  selector: 'app-pokemon',
  //Codigo HTML utilizado para cargar la informacion del modelo de los pokemons y ponerlos en una card
  template: `
    <div class="card">
      <div class="image">
        <a [routerLink]="['/detalle_pokemones', pokemon.id]">
          <img
            [src]="pokemon.sprites.front_default"
            [alt]="pokemon.name"
            class="card-img-top"
          />
        </a>
      </div>
      <div class="card-inner">
        <div class="header">
          <a [routerLink]="['/detalle_pokemones', pokemon.id]">
            <h2>{{pokemon.name | slice: 0:15}}</h2>
          </a>
          <h4 class="text-muted">Experiencia base: {{pokemon.base_experience}}</h4>
        </div>
      </div>
    </div>
  `,
  changeDetection:ChangeDetectionStrategy.OnPush
})

export class PokemonComponent{
  @Input()pokemon:Pokemon;
}
