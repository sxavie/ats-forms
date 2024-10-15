import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent {

  login(form: NgForm) {
    if (!form.valid) {
      console.log('invalid form')
      return
    }
    
    console.log('data sent to server ', form.value)
  }

}
