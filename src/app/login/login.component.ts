import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterOutlet,RouterModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  
  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  validateUser() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const result = this.userService.validateUser(email, password);

      if (result) {
        localStorage.setItem('useremail', email);
        this.router.navigate(['/welcome']); 
      } else {
        alert('Login Failed');
      }
    } else {
      alert('Please fill in the required fields with valid data.');
    }
  }

}
