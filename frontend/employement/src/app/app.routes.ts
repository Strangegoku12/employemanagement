import { Routes } from '@angular/router';
import { roleGuard } from '../app/role.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../allfolders/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'employer',
    loadComponent: () => import('../allfolders/employer/employer.component').then(m => m.EmployerComponent),
    canActivate: [roleGuard],
    data: { roles: ['employee'] }  // only admin can access
  },
  {
    path: 'leave',
    loadComponent: () => import('../allfolders/leave/leave.component').then(m => m.LeaveComponent),
    canActivate: [roleGuard],
    data: { roles: ['employee'] }  // only admin
  },
  {
    path: 'salary',
    loadComponent: () => import('../allfolders/salary/salary.component').then(m => m.SalaryComponent),
    canActivate: [roleGuard],
    data: { roles: ['admin'] }  // only admin
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../allfolders/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [roleGuard],
    data: { roles: ['employee'] }  // both admin and user
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('../allfolders/salary/salary.component').then(m => m.SalaryComponent),
  }
];
