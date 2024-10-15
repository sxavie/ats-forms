import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive.component.html',
  styleUrl: './reactive.component.css'
})
export class ReactiveComponent {

  loginForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    password: new FormControl('', 
      [ Validators.required, 
        Validators.minLength(6), 
        Validators.pattern('(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}')
      ])
  });

  login() {
    if(this.loginForm.invalid) {
      console.log('invalid form')
      return;
    }

    console.log('data sent to server ', this.loginForm.value)
  }
  
}
