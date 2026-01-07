import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePokemonesComponent } from './detalle-pokemones.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';

import { PokemonService } from '@app/shared/services/pokemon.service';
import { Pokemon } from '@app/shared/components/interfaces/info_pokemon';

import { RouterTestingModule } from '@angular/router/testing';

describe('DetallePokemonesComponent', () => {
  let component: DetallePokemonesComponent;
  let fixture: ComponentFixture<DetallePokemonesComponent>;
  let pokemonService: PokemonService;
  let location: Location;

  const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  sprites: {
    front_default: 'https://pokeapi.co/media/sprites/pokemon/1.png'
  } as any,
  types: [
    { type: { name: 'grass' } } as any
  ],
  abilities: [
    { ability: { name: 'overgrow' } } as any
  ],
  stats: [
    { base_stat: 45, stat: { name: 'hp' } }
  ]
};

class MockPokemonService {
  getPokemon(id: number) {
    return of(mockPokemon);
  }
}

const mockActivatedRoute = {
  params: of({ id: 1 })
};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallePokemonesComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PokemonService, useClass: MockPokemonService },
        { provide: Location, useClass: Location } // usamos el real
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePokemonesComponent);
    component = fixture.componentInstance;

    pokemonService = TestBed.inject(PokemonService);
    location = TestBed.inject(Location);

    fixture.detectChanges(); // ngOnInit
  });

    it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should call pokemonService.getPokemon with route id', () => {
    const spy = spyOn(pokemonService, 'getPokemon').and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith(1);
  });

    it('should set pokemon$ observable with pokemon data', (done) => {
    component.pokemon$.subscribe(pokemon => {
      expect(pokemon).toEqual(mockPokemon);
      done();
    });
  });

    it('should call location.back when volver is called', () => {
    const spy = spyOn(location, 'back');

    component.volver();

    expect(spy).toHaveBeenCalled();
  });

});
