import { Routes } from '@angular/router';
import { Landing } from './pages/landing/landing';
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { authGuard } from './components/guards/auth.guard';

import { Mainlayout } from './layout/mainlayout/mainlayout';
import { Home } from './pages/home/home';

import { Group } from './pages/group/group';
import { User } from './pages/user/user';

export const routes: Routes = [

  // Página pública inicial
  { path: '', component: Landing },

  // Auth (público)
  {
    path: 'auth',
    children: [
      { path: 'login', component: Login },
      { path: 'register', component: Register }
    ]
  },

  // Zona privada con layout + guard
  {
    path: '',
    component: Mainlayout,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: Home },
      { path: 'group', component: Group },
      { path: 'user', component: User }

    ]
  },

  { path: '**', redirectTo: '' }
];