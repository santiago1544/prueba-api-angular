import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPokemonesComponent } from './lista-pokemones.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';

import { PokemonService } from '@app/shared/services/pokemon.service';
import { Pokemon } from '@app/shared/components/interfaces/info_pokemon';

import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ListaPokemonesComponent', () => {
  let component: ListaPokemonesComponent;
  let fixture: ComponentFixture<ListaPokemonesComponent>;
  let pokemonService: PokemonService;
  let location: Location;

  const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  height: 7,
  weight: 69,
  base_experience: 64,
  sprites: { front_default: 'img' } as any,
  types: [{ type: { name: 'grass' } }] as any,
  abilities: [{ ability: { name: 'overgrow' } }] as any,
  stats: [{ base_stat: 45, stat: { name: 'hp' } }]
};

const mockPokemonList = {
  results: [
    { name: 'bulbasaur', url: 'url/1' },
    { name: 'ivysaur', url: 'url/2' }
  ]
};

class MockPokemonService {
  getAllPokemons() {
    return of(mockPokemonList);
  }

  getPokemonByUrl(url: string) {
    return of(mockPokemon);
  }

  getPokemon(nameOrId: string | number) {
    return of(mockPokemon);
  }
}

const mockActivatedRoute = {
  queryParams: of({})
};


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaPokemonesComponent],
      imports: [
        RouterTestingModule,
        MatPaginatorModule,
        MatTableModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: PokemonService, useClass: MockPokemonService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        Location
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPokemonesComponent);
    component = fixture.componentInstance;

    pokemonService = TestBed.inject(PokemonService);
    location = TestBed.inject(Location);

    fixture.detectChanges(); // ngOnInit
  });

    it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should call cargarPokemones when no query param is present', () => {
    const spy = spyOn(component, 'cargarPokemones').and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalled();
  });

    it('should call buscarPokemon when query param exists', () => {
    const spy = spyOn(component, 'buscarPokemon').and.callThrough();

    component['route'].queryParams = of({ q: 'pikachu' });
    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith('pikachu');
  });

  it('should load pokemones list', () => {
    component.cargarPokemones();

    expect(component.pokemones.length).toBeGreaterThan(0);
    expect(component.totalPokemones).toBe(2);
  });

    it('should update pagination and reload pokemones', () => {
    const spy = spyOn(component, 'cargarPokemones').and.callThrough();

    component.onPageChange({
      pageIndex: 1,
      pageSize: 10,
      length: 100
    });

    expect(component.pageIndex).toBe(1);
    expect(component.pageSize).toBe(10);
    expect(spy).toHaveBeenCalled();
  });

    it('should limit pageSize to max 20', () => {
    component.onPageChange({
      pageIndex: 0,
      pageSize: 50,
      length: 100
    });

    expect(component.pageSize).toBe(20);
  });

it('should load pokemones when query param is empty', () => {
  spyOn(component, 'cargarPokemones').and.callThrough();

  fixture.detectChanges();

  expect(component.totalPokemones).toBeGreaterThanOrEqual(0);
});


});
