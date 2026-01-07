import { Component } from '@angular/core';
import { ViewToggleService } from '@shared/services/view-toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private viewToggleService: ViewToggleService) {}

  onToggleView(event: Event) {
    const value = (event.target as HTMLSelectElement).value as 'personajes' | 'pokemones';
    this.viewToggleService.setView(value);
  }
}
