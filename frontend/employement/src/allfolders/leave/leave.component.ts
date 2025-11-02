import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { EmployementapiService } from '../../Services/employementapi.service';
import { AuthapiService } from '../../Services/authapi.service';
@Component({
  selector: 'app-leave',
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.css'
})
export class LeaveComponent {
  showForm = false;
  leaveform!: FormGroup;

  employees: any[] = [];
  currentEditingEmployeeId: any;
  userRole: any

  constructor(private fb: FormBuilder, private getemployement: EmployementapiService,private authService:AuthapiService) {
    this.leaveform = this.fb.group({
      name: [''],
      from_date: [''],
      to_date: [''],
      reason: ['']
    });
  }

  ngOnInit() {
    this.getallemployess();
      this.userRole = this.authService.getUserRole();
        console.log("shwot yeh this tole",this.userRole);
  }

  openForm() {
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.leaveform.reset();
  }
getallemployess() {
  this.getemployement.getleave().subscribe({
    next: (res) => {
      this.employees = res;
      console.log(this.employees);
    },
    error: (err) => console.error(err)
  });
}



 submitForm() {
  if (!this.leaveform.valid) {
    alert('Please fill all fields correctly!');
    return;
  }

  const formValue = this.leaveform.value;

  // if (this.currentEditingEmployeeId) {
  //   // Edit mode
  //   this.getemployement.editemployement(this.currentEditingEmployeeId, formValue).subscribe({
  //     next: (res) => {
  //       console.log('Employee updated:', res);
  //       this.getallemployess(); // Refresh list
  //     },
  //     error: (err) => console.error(err)
  //   });
  // } else {
    // Add mode
    this.getemployement.addleave(formValue).subscribe({
      next: (res) => {
        console.log('Employee added:', res);
        this.getallemployess();
      },
      error: (err) => console.error(err)
    });
  // }

  this.closeForm();
  this.currentEditingEmployeeId = null; // reset edit mode
}


  // edit(emp: any) {
  //   this.showForm = true;
  //   this.leaveform.patchValue(emp);
  //   this.currentEditingEmployeeId = emp._id; // set current editing employee ID

  // }

  delete(emp: any) {
    this.getemployement.deleteleave(emp._id).subscribe({
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
approveleave(emp:any){
   this.getemployement.approveleaves(emp._id).subscribe({
      next: (res) => {
        console.log(res);
        this.getallemployess();
      }
      ,
      error: (err) => console.error(err)
    });
}
rejectleave(emp:any){
   this.getemployement.rejectedleaves(emp._id).subscribe({
      next: (res) => {
        console.log(res);
        this.getallemployess();
      }
      ,
      error: (err) => console.error(err)
    });
}

}
