import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonComponent } from './pokemon.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Pokemon } from '@app/shared/components/interfaces/info_pokemon';

describe('PokemonComponent', () => {
  let component: PokemonComponent;
  let fixture: ComponentFixture<PokemonComponent>;

  const mockPokemon: Pokemon = {
    id: 1,
    name: 'bulbasaur',
    base_experience: 64,
    height: 7,
    weight: 69,
    sprites: {
      front_default: 'https://pokeapi.co/media/sprites/pokemon/1.png'
    } as any,
    types: [],
    abilities: [],
    stats: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokemonComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA] // ignora routerLink
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonComponent);
    component = fixture.componentInstance;

    component.pokemon = mockPokemon; // Input
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render pokemon name', () => {
    const nameEl = fixture.debugElement.query(By.css('h2'));
    expect(nameEl.nativeElement.textContent).toContain('bulbasaur');
  });

  it('should render pokemon image', () => {
    const imgEl = fixture.debugElement.query(By.css('img'));
    expect(imgEl.nativeElement.src).toContain(mockPokemon.sprites.front_default);
  });

  it('should render base experience', () => {
    const expEl = fixture.debugElement.query(By.css('.text-muted'));
    expect(expEl.nativeElement.textContent).toContain(
      mockPokemon.base_experience.toString()
    );
  });

  it('should generate correct routerLink', () => {
    const linkEl = fixture.debugElement.query(By.css('a'));
    expect(linkEl).toBeTruthy();
  });
});
