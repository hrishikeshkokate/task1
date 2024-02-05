import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ConnectionService } from 'ng-connection-service'
import '@angular/compiler';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports:  [CommonModule,FormsModule,RouterOutlet,RouterModule,ReactiveFormsModule,HttpClientModule],
  providers: [ConnectionService],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {

// title = 'internet-connection-check';
status = 'ONLINE'; 
isConnected! :boolean;

constructor(private connectionService: ConnectionService) {}
  ngOnInit(): void {
    this.connectionService.monitor().subscribe((connectionState: any) => {
      // Check if connectionState is falsy
      //this.isConnected = !!connectionState;
  
      this.isConnected = connectionState;

  
      // Now isConnected is a boolean value
      if (this.isConnected) {
        this.status = "ONLINE";
      } else {
        this.status = "OFFLINE";
      }
  
      // Log the connection state and isConnected
      console.log('Connection State:', connectionState);
      console.log('Is Connected:', this.isConnected);
    });
  
  }

}
