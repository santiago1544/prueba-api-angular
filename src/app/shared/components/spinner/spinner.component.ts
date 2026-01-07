import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="spinner-wrapper">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `,
  styles: [`
    .spinner-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 56px);
    }
  `]
})
export class SpinnerComponent {}
