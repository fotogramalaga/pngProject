import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* IMPORTACIONES NUEVAS */
import { provideStorage, getStorage } from '@angular/fire/storage';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { ConfirmationService } from 'primeng/api';
/* FIN IMPORTACIONES NUEVAS */




import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { FavoritosComponent } from './favoritos/favoritos.component';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app.routing.module';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    ImagenesComponent,
    FavoritosComponent,
    ErrorComponent,
    HomeComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    ButtonModule,
    CheckboxModule,
    InputTextareaModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatToolbarModule,
    ConfirmDialogModule,
    CardModule,
    InputTextModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    AppRoutingModule,
    
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  providers: [ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
