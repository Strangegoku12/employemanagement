import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () => import('../allfolders/login/login.component').then(m => m.LoginComponent)
    }
];
