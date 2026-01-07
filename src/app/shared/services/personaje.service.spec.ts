import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { PersonajeService } from './personaje.service';
import { environment } from '@environment/enviroment';

describe('PersonajeService', () => {
  let service: PersonajeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PersonajeService]
    });

    service = TestBed.inject(PersonajeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get personajes (API base)', () => {
    const mockApiResponse = {
      info: { count: 2 },
      results: [
        { id: 1, name: 'Rick Sanchez' },
        { id: 2, name: 'Morty Smith' }
      ]
    };

    service.getPersonajes().subscribe((res: any) => {
      expect(res.results.length).toBe(2);
      expect(res.results[0].name).toBe('Rick Sanchez');
    });

    const req = httpMock.expectOne(environment.urlAPI);
    expect(req.request.method).toBe('GET');
    req.flush(mockApiResponse);
  });

  it('should get personaje details by id', () => {
    const mockPersonaje = { id: 1, name: 'Rick Sanchez' };

    service.detalles(1).subscribe((res) => {
      expect(res.name).toBe('Rick Sanchez');
    });

    const req = httpMock.expectOne(`${environment.urlAPI}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockPersonaje);
  });

  it('should clear cache', () => {
    service['apiPageCache'].set('1-', []);
    service['totalCount'] = 10;

    service.clearCache();

    expect(service['apiPageCache'].size).toBe(0);
    expect(service['totalCount']).toBe(0);
  });
});
