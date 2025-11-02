import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EmployementapiService } from '../../Services/employementapi.service';
import { AuthapiService } from '../../Services/authapi.service';

@Component({
  selector: 'app-salary',
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './salary.component.html',
  styleUrl: './salary.component.css'
})
export class SalaryComponent {
 showForm = false;
  salaryform!: FormGroup;

  salary: any[] = [];
  currentEditingEmployeeId: any;
  userRole: any

  constructor(private fb: FormBuilder, private getemployement: EmployementapiService,private authService:AuthapiService) {
    this.salaryform = this.fb.group({
      name: [''],
      salary: [''],
      allowance: [''],
      deduction: [''],
      total: [''],
      paydate: ['']
    });
  }

  ngOnInit() {
    this.getallsalary();
      this.userRole = this.authService.getUserRole();
        console.log("shwot yeh this tole",this.userRole);
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.salaryform.reset();
  }
getallsalary() {
  this.getemployement.getsalary().subscribe({
    next: (res) => {
      this.salary = res;
      console.log(this.salary);
    },
    error: (err) => console.error(err)
  });
}



 submitForm() {
  if (!this.salaryform.valid) {
    alert('Please fill all fields correctly!');
    return;
  }

  const formValue = this.salaryform.value;

  // if (this.currentEditingEmployeeId) {
  //   // Edit mode
  //   this.getemployement.editemployement(this.currentEditingEmployeeId, formValue).subscribe({
  //     next: (res) => {
  //       console.log('Employee updated:', res);
  //       this.getallsalary(); // Refresh list
  //     },
  //     error: (err) => console.error(err)
  //   });
  // } else {
    // Add mode
    this.getemployement.addsalary(formValue).subscribe({
      next: (res) => {
        console.log('Employee added:', res);
        this.getallsalary();
      },
      error: (err) => console.error(err)
    });
  // }

  this.closeForm();
  this.currentEditingEmployeeId = null; // reset edit mode
}


  // edit(emp: any) {
  //   this.showForm = true;
  //   this.salaryform.patchValue(emp);
  //   this.currentEditingEmployeeId = emp._id; // set current editing employee ID

  // }

  delete(emp: any) {
    this.getemployement.deleteleave(emp._id).subscribe({
      next: (res) => {
        console.log(res);
        this.removesalarylist(emp);
      },
      error: (err) => console.error(err)
    });
  }

  removesalarylist(emp: any) {
    this.salary = this.salary.filter(e => e !== emp);
  }


}
