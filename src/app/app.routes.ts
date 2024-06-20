import { Routes } from '@angular/router';
import { SignInComponent } from './pages/auth/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth/sign-up/sign-up.component';
import { TasksComponent } from './pages/home-page/tasks/tasks.component';
import { ProjectsComponent } from './pages/home-page/projects/projects.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { authGuard } from './core/guards';

export const routes: Routes = [
  {
    path: '',
    component: SignInComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'home-page',
    canActivate: [authGuard],
    loadChildren: () => import('./pages/home-page/home-page.routes').then(m => m.routes)
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
