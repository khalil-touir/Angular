import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms'; // Import du FormsModule
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';

const routes: Routes = [
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'dashboard', component: DashboardComponent },  // Ajout de la route pour le dashboard
  { path: '', redirectTo: '/connexion', pathMatch: 'full' },  // Redirection par défaut vers connexion
];

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Ajoutez cette ligne
  declarations: [
    AppComponent,
    ConnexionComponent,
    InscriptionComponent,
    DashboardComponent
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,// Ajoutez FormsModule ici
    RouterModule.forRoot(routes), // Ajout des routes ici
    FormsModule,// Importation du module 
    QRCodeModule, // Importation pour le QR code
    HttpClientModule// Import du module HTTP Client
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
