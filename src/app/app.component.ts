import { Component } from '@angular/core';
import { ViewToggleService } from './shared/services/view-toggle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading$ = this.viewToggleService.loading$;

  constructor(private viewToggleService: ViewToggleService) {}
}
