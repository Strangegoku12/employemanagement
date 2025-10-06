import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthapiService } from '../../Services/authapi.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  providers:[AuthapiService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm:any
registerForm:any
  constructor(private fb: FormBuilder,private auth:AuthapiService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

      this.registerForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  isLogin = true;
  toggleForm() {
    this.isLogin = !this.isLogin;
  }
  onLogin() {
  this.auth.login(this.loginForm.value).subscribe(res=>{
    console.log(res);
  })
  }
  onRegister(){
  this.auth.register(this.registerForm.value).subscribe(res=>{
    console.log(res);
  })
  }
}
