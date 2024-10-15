import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TemplateComponent } from './shared/template/template.component';
import { ReactiveComponent } from './shared/reactive/reactive.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemplateComponent, ReactiveComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
