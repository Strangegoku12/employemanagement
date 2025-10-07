import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EmployementapiService } from '../../Services/employementapi.service';

interface Employee {
  name?: string;
  email?: string;
  employeid?: string;
  date_of_birth?: string;
  gender?: string;
  marital_status?: string;
  designation?: string;
  department?: string;
  salary?: string;
  password?: string;
}

@Component({
  selector: 'app-employer',
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent {
  showForm = false;
  employerForm!: FormGroup;

  employees: Employee[] = [];

  constructor(private fb: FormBuilder, private getemployement: EmployementapiService) {
    this.employerForm = this.fb.group({
      name: [''],
      email: [''],
      employeid: [''],
      date_of_birth: [''],
      gender: [''],
      marital_status: [''],
      designation: [''],
      department: [''],
      salary: [''],
      password: [''],
    });
  }

  ngOnInit() {
    this.getallemployess();
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.employerForm.reset();
  }
getallemployess() {
  this.getemployement.getallemployementapi().subscribe({
    next: (res) => {
      this.employees = res.employees;
      console.log(this.employees);
    },
    error: (err) => console.error(err)
  });
}



  submitForm() {
    if (this.employerForm.valid) {
      console.log('Form Submitted:', this.employerForm.value);
      this.getemployement.addemployement(this.employerForm.value).subscribe({
        next: (res) => {
          console.log(res);
          this.getallemployess(); // Refresh the employee list
        },
        error: (err) => console.error(err)
      });
      this.closeForm();
    } else {
      alert('Please fill all fields correctly!');
    }
  }

  save(emp: any) {
    alert(`Saved changes for ${emp.name}`);
  }

  edit(emp: any) {
    alert(`Edit ${emp.name}`);
  }

  delete(emp: any) {
    this.employees = this.employees.filter(e => e !== emp);
  }
}
