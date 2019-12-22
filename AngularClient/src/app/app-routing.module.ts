import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // {
  //   path: 'auth',
  //   loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule),
  //   canActivate: []
  // },
  {
    path: 'app',
    loadChildren: () => import('src/app/pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: '',
    loadChildren: () => import('src/app/pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '**',
    redirectTo: 'app',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
