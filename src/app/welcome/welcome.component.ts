import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {

  internetAvailable: boolean = false;

  constructor() { }
  
  ngOnInit(): void {
    this.checkInternetConnection();
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
