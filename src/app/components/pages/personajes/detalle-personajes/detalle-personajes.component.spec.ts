import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallePersonajesComponent } from './detalle-personajes.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import { PersonajeService } from '@app/shared/services/personaje.service';
import { Personaje } from '@app/shared/components/interfaces/info_personajes';

describe('DetallePersonajesComponent', () => {
  let component: DetallePersonajesComponent;
  let fixture: ComponentFixture<DetallePersonajesComponent>;
  let personajeService: PersonajeService;
  let location: Location;

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

  class MockPersonajeService {
    detalles(id: number) {
      return of(mockPersonaje);
    }
  }

  const mockActivatedRoute = {
    params: of({ id: 1 })
  };

  class MockLocation {
    back = jasmine.createSpy('back');
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetallePersonajesComponent],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PersonajeService, useClass: MockPersonajeService },
        { provide: Location, useClass: MockLocation }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetallePersonajesComponent);
    component = fixture.componentInstance;

    personajeService = TestBed.inject(PersonajeService);
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call personajeService.detalles with route id', () => {
    const spy = spyOn(personajeService, 'detalles').and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should set personajes observable with personaje data', (done) => {
    component.personajes.subscribe(personaje => {
      expect(personaje).toEqual(mockPersonaje);
      done();
    });
  });

  it('should call location.back when volver is called', () => {
    component.volver();
    expect(location.back).toHaveBeenCalled();
  });
});