import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsComponent } from "./components/forms/forms.component";
import { SignalComponent } from "./components/signal/signal.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsComponent,
    SignalComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'v-18';
}
