import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagenesComponent } from './imagenes/imagenes.component';

import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'imagenes', component: ImagenesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
