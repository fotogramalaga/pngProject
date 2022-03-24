import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { HomeComponent } from './home/home.component';
import { ImagenesComponent } from './imagenes/imagenes.component';

import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
/*   { path: 'imagenes', component: ImagenesComponent },
 */  { path: 'home', component: HomeComponent },
  { path: 'imagenes', component: ImagenesComponent },
  { path: 'favoritos', component: FavoritosComponent},
  { path: '**', component: ImagenesComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
