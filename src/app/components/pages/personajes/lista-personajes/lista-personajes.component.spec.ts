import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPersonajesComponent } from './lista-personajes.component';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { of } from 'rxjs';

import { PersonajeService } from '@app/shared/services/personaje.service';
import { Personaje } from '@app/shared/components/interfaces/info_personajes';

import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';


describe('ListaPersonajesComponent', () => {
  let component: ListaPersonajesComponent;
  let fixture: ComponentFixture<ListaPersonajesComponent>;
  let personajeService: PersonajeService;
  let location: Location;

  const mockPersonajes: Personaje[] = [
  {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
    image: 'img1',
    created: '2017-11-04'
  },
  {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
    image: 'img2',
    created: '2017-11-04'
  }
];

class MockPersonajeService {
  getPersonajesSubPage(pageIndex: number, pageSize: number, query: string) {
    return of({
      personajes: mockPersonajes,
      total: 100
    });
  }

  getRandomPersonajes(limit: number) {
    return of({
      personajes: mockPersonajes,
      total: 100
    });
  }
}

const mockActivatedRoute = {
  queryParams: of({ q: '' })
};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaPersonajesComponent],
      imports: [
        RouterTestingModule,
        MatPaginatorModule,
        MatTableModule, 
        NoopAnimationsModule
      ],
      providers: [
        { provide: PersonajeService, useClass: MockPersonajeService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListaPersonajesComponent);
    component = fixture.componentInstance;

    personajeService = TestBed.inject(PersonajeService);
    location = TestBed.inject(Location);

    fixture.detectChanges(); // ngOnInit
  });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load personajes on init', () => {
        expect(component.personajes.length).toBe(2);
        expect(component.totalPersonajes).toBe(100);
    });

    it('should call loadData when query params change', () => {
        const spy = spyOn(component, 'loadData').and.callThrough();

        component.ngOnInit();

        expect(spy).toHaveBeenCalled();
    });

    it('should update pageIndex and pageSize on page change', () => {
        const spy = spyOn(component, 'loadData').and.callThrough();

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

    it('should load random personajes', () => {
        component.loadRandomData();

        expect(component.personajes.length).toBe(2);
        expect(component.totalPersonajes).toBe(100);
    });

    it('should call location.back when volver is called', () => {
        const spy = spyOn(location, 'back');
        component.volver();
        expect(spy).toHaveBeenCalled();
    });

});




