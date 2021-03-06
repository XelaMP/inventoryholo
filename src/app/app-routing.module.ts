import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './modules/login/login.component';
import {NgModule} from '@angular/core';
import {AdminGuard} from './guards/admin.guard';
import {UserGuard} from './guards/user.guard';


const routes: Routes = [{path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AdminGuard], data: {preload: true}
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule),
    canActivate: [UserGuard], data: {preload: true}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      useHash: true,
      enableTracing: true,
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
