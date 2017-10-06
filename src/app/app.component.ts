import { Component } from '@angular/core';

export const APP_NAME = 'Shopping List App';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css'
  ]
})
export class AppComponent {
  title = APP_NAME;
}
