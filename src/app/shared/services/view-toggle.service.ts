import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ViewToggleService {
  private currentView = new BehaviorSubject<'personajes' | 'pokemones'>('personajes');
  currentView$ = this.currentView.asObservable();

  setView(view: 'personajes' | 'pokemones') {
    this.currentView.next(view);
  }

  getView(): 'personajes' | 'pokemones' {
    return this.currentView.value;
  }
}

