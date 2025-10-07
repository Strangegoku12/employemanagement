import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('../allfolders/login/login.component').then(m => m.LoginComponent)
    },
    {
        path:'employer',
        loadComponent:()=>import('../allfolders/employer/employer.component').then(m=>m.EmployerComponent)
    },
    {
        path:'leave',
        loadComponent:()=>import('../allfolders/leave/leave.component').then(m=>m.LeaveComponent)
    },
    {
        path:'salary',
        loadComponent:()=>import('../allfolders/salary/salary.component').then(m=>m.SalaryComponent)
    },
    {
        path:'dashboard',
        loadComponent:()=>import('../allfolders/dashboard/dashboard.component').then(m=>m.DashboardComponent)
    }
];
