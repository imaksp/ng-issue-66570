import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SignalFormDemo } from './components/demo-signal-form';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SignalFormDemo],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('primeng-form-field');
}
