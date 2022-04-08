import { LOCALE_ID, NgModule } from '@angular/core';
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
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './header/header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormularioComponent } from './header/formulario/formulario.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CardComponent } from './components/card/card.component';

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ImagenesComponent,
    FavoritosComponent,
    ErrorComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    FormularioComponent,
    CardComponent,
  ],
  imports: [
    FontAwesomeModule,
    BrowserModule,
    MatDialogModule,
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
    SweetAlert2Module,

    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [ConfirmationService, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
