import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EmployementapiService } from '../../Services/employementapi.service';

// interface Employee {
//   name?: string;
//   email?: string;
//   employeid?: string;
//   date_of_birth?: string;
//   gender?: string;
//   marital_status?: string;
//   designation?: string;
//   department?: string;
//   salary?: string;
//   password?: string;
// }

@Component({
  selector: 'app-employer',
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.css']
})
export class EmployerComponent {
  showForm = false;
  employerForm!: FormGroup;

  employees: any[] = [];
  currentEditingEmployeeId: any;

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
  if (!this.employerForm.valid) {
    alert('Please fill all fields correctly!');
    return;
  }

  const formValue = this.employerForm.value;

  if (this.currentEditingEmployeeId) {
    // Edit mode
    this.getemployement.editemployement(this.currentEditingEmployeeId, formValue).subscribe({
      next: (res) => {
        console.log('Employee updated:', res);
        this.getallemployess(); // Refresh list
      },
      error: (err) => console.error(err)
    });
  } else {
    // Add mode
    this.getemployement.addemployement(formValue).subscribe({
      next: (res) => {
        console.log('Employee added:', res);
        this.getallemployess();
      },
      error: (err) => console.error(err)
    });
  }

  this.closeForm();
  this.currentEditingEmployeeId = null; // reset edit mode
}


  edit(emp: any) {
    this.showForm = true;
    this.employerForm.patchValue(emp);
    this.currentEditingEmployeeId = emp._id; // set current editing employee ID

  }

  delete(emp: any) {
    this.getemployement.deleteemployement(emp._id).subscribe({
      next: (res) => {
        console.log(res);
        this.removeEmployeeFromList(emp);
      },
      error: (err) => console.error(err)
    });
  }

  removeEmployeeFromList(emp: any) {
    this.employees = this.employees.filter(e => e !== emp);
  }
}
