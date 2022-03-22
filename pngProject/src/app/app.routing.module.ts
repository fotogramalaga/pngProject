import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImagenesComponent } from './imagenes/imagenes.component';

import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'imagenes', pathMatch: 'full' },
/*   { path: 'imagenes', component: ImagenesComponent },
 */  { path: 'home', component: HomeComponent },
  { path: 'imagenes', component: ImagenesComponent },
  { path: '**', component: ImagenesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
