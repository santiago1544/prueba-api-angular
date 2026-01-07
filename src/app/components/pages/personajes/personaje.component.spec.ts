import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonajeComponent } from './personaje.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { Personaje } from '@app/shared/components/interfaces/info_personajes';

describe('PersonajeComponent', () => {
  let component: PersonajeComponent;
  let fixture: ComponentFixture<PersonajeComponent>;

  const mockPersonaje: Personaje = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  created: '2017-11-04'
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonajeComponent],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PersonajeComponent);
    component = fixture.componentInstance;

    // 🔑 IMPORTANTE: asignar el @Input antes de detectChanges
    component.personaje = mockPersonaje;

    fixture.detectChanges();
  });

    it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display personaje name', () => {
    const nameEl = fixture.debugElement.query(By.css('h2'));
    expect(nameEl.nativeElement.textContent).toContain('Rick Sanchez');
  });

  it('should render personaje image', () => {
    const imgEl = fixture.debugElement.query(By.css('img'));

    expect(imgEl).toBeTruthy();
    expect(imgEl.nativeElement.src).toContain(mockPersonaje.image);
    expect(imgEl.nativeElement.alt).toBe(mockPersonaje.name);
  });

    it('should display personaje status', () => {
    const statusEl = fixture.debugElement.query(By.css('.text-muted'));
    expect(statusEl.nativeElement.textContent).toContain('Alive');
  });

  it('should have correct routerLink to detalle_personajes', () => {
    const linkDebugEl = fixture.debugElement.query(By.css('a'));
    const routerLink = linkDebugEl.attributes['ng-reflect-router-link'];

    expect(routerLink).toContain('/detalle_personajes,1');
  });

});