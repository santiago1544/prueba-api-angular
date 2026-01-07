import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewToggleService } from '@shared/services/view-toggle.service';

@Component({
  selector: 'app-buscador',
  template: `
    <input
  #inputSearch
  autofocus
  type="text"
  class="form-control-lg"
  [placeholder]="
    currentView === 'personajes' ? 'Buscar Personaje' : 'Buscar Pokémon'
  "
  (keyup)="onSearch(inputSearch.value)"
/>
  `,
  styles: ['input {width:100%;}'],
})
export class BuscadorComponent implements OnInit {
  public currentView: 'personajes' | 'pokemones' = 'personajes';

  constructor(
    private router: Router,
    private viewToggleService: ViewToggleService
  ) {}

  ngOnInit(): void {
    //consumir el servicio del toggle
    this.viewToggleService.currentView$.subscribe((view) => {
      this.currentView = view;
    });
  }

  onSearch(value: string) {
    if (value && value.length > 1) {
      if (this.currentView === 'personajes') {
        this.router.navigate(['/lista_personajes'], {
          queryParams: { q: value },
        });
      } else if (this.currentView === 'pokemones') {
        this.router.navigate(['/lista_pokemones'], {
          queryParams: { q: value },
        });
      }
    }

    if (value && value.length <= 1) {
      this.router.navigate(['/']);
    }
  }
}
