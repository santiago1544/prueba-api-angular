import { Component, OnInit } from '@angular/core';
import { ViewToggleService } from '@shared/services/view-toggle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentView: 'personajes' | 'pokemones' = 'personajes';

  constructor(private viewToggleService: ViewToggleService) {}

  ngOnInit(): void {
    this.viewToggleService.currentView$.subscribe(view => {
      this.currentView = view;
    });
  }
}
