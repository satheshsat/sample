import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/tabs',
        pathMatch: 'full'
    },
    {
        path: 'tabs',
        loadComponent: () => import('./tabbed-form/tabbed-form').then(m => m.TabbedForm)
    },
    {
        path: '**',
        redirectTo: '/tabs'
    }
];
