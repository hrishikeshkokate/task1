import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports:  [CommonModule,FormsModule,RouterOutlet,RouterModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  internetAvailable: boolean = false;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(5)]],
      lastname: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required,Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }
  ngOnInit(): void {
    this.checkInternetConnection();
  }
  
  
  get firstname() {
    return this.registerForm.get('firstname');
  }

  get lastname() {
    return this.registerForm.get('lastname');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get mobile() {
    return this.registerForm.get('mobile');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirm_password() {
    return this.registerForm.get('confirm_password');
  }

  addUser() {
    if (this.registerForm.valid && this.password?.value === this.confirm_password?.value) {
      const {  email, password } = this.registerForm.value;
  
      // Save user to local storage
      this.userService.addUser({ email, password });
  
      alert('Registration Successful');
      this.router.navigate(['/login']);
    } else {
      alert('Please fill in the required fields with valid data, and make sure passwords match.');
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
