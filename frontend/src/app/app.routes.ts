import { Routes } from '@angular/router';

import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { Setup } from './components/setup/setup';
import { Home } from './components/home/home';
import { Register } from './components/register/register';
import { Login } from './components/login/login';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { AccessDenied } from './components/access-denied/access-denied';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // ✅ Default to home

  { path: 'home', component: Home },
  {
    path: 'recipe-list',
    loadComponent: () =>
      import('./components/recipe-list/recipe-list')
        .then(m => m.RecipeList),
                canActivate: [authGuard]

  },
  {
    path: 'recipe-details/:id',
    loadComponent: () =>
      import('./components/recipe-details/recipe-details')
        .then(m => m.RecipeDetails),
                canActivate: [authGuard,roleGuard]

  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/admin/admin')
        .then(m => m.Admin),
        canActivate: [authGuard,roleGuard]
  },
  { path: 'setup',
    loadComponent:()=> 
      import('./components/setup/setup').then(m => m.Setup) ,
            canActivate: [authGuard,roleGuard]

  },

  { path: 'navbar', component: Navbar },
  { path: 'footer', component: Footer },

  {path: 'register', loadComponent:()=>import('./components/register/register').then(m => m.Register)},
  {path: 'login', loadComponent:()=>import('./components/login/login').then(m=>m.Login)
  },

  {path: 'access-denied', component: AccessDenied}
];
