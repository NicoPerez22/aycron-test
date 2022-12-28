import { MainLayoutComponent } from './layout/main-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        ...canActivate(() => redirectUnauthorizedTo(['/auth/login'])),
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },

      {
        path: 'map',
        ...canActivate(() => redirectUnauthorizedTo(['/auth/login'])),
        loadChildren: () => import('./map-content/map.module').then(m => m.MapModule)
      },

      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
    
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
