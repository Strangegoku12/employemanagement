import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { EmployementapiService } from '../../Services/employementapi.service';

@Component({
  selector: 'app-dashboard',
  imports: [SidebarComponent,CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  employeesdata: any;
  constructor(private getemployement: EmployementapiService) {}
  ngOnInit() {
    this.getallemployess();
  }
  getallemployess() {
  this.getemployement.getemployeedashbaord().subscribe({
    next: (res) => {
      this.employeesdata = res;
      console.log(this.employeesdata);
    },
    error: (err) => console.error(err)
  });
}
}
