import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  internetAvailable: boolean = false;
  
  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit(): void {
    this.checkInternetConnection();
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

  checkInternetConnection() {
    this.internetAvailable = navigator.onLine;
    window.addEventListener('online', () => this.updateInternetStatus());
    window.addEventListener('offline', () => this.updateInternetStatus());
  }
  updateInternetStatus() {
    this.internetAvailable = navigator.onLine;
  }

}
