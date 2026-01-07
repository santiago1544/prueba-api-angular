import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ViewToggleService {
  private currentView = new BehaviorSubject<'personajes' | 'pokemones'>('personajes');
  currentView$ = this.currentView.asObservable();
  
  private loading = new BehaviorSubject<boolean>(false);
  loading$ = this.loading.asObservable();
  private loadingTimeout?: any;

  setView(view: 'personajes' | 'pokemones') {
    this.loading.next(true);  
    this.currentView.next(view);
  }

  stopLoading(delayMs: number = 1000) {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }

    this.loadingTimeout = setTimeout(() => {
      this.loading.next(false);
    }, delayMs);
  }

  getView(): 'personajes' | 'pokemones' {
    return this.currentView.value;
  }
}

