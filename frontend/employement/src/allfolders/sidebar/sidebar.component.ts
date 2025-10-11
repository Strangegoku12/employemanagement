import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthapiService } from '../../Services/authapi.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule,CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  userRole: any;
  constructor(private authService:AuthapiService) {}
  ngOnInit(): void {
        this.userRole = this.authService.getUserRole();
        console.log("shwot yeh this tole",this.userRole);

  }
}
