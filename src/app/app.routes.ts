import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./modules/login/login.component')
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component'),
        children: [
            {
                path: 'download-file',
                loadComponent: () => import('./modules/download-file/download-file.component')
            },
            {
                path: 'cryptography',
                loadComponent: () => import('./modules/cryptography/cryptography.component')
            },
            {
                path: '**',
                redirectTo: 'download-file',
            }
        ]
    },
    {
        path: '**',
        loadComponent: () => import('./modules/login/login.component')
    },
];
