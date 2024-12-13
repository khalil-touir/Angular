// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // Si vous avez un tableau de bord

const routes: Routes = [
  { path: '', redirectTo: '/connexion', pathMatch: 'full' }, // Redirection vers la page de connexion par défaut
  { path: 'connexion', component: ConnexionComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'dashboard', component: DashboardComponent }, // Ajouter une route vers le tableau de bord
  { path: '**', redirectTo: '/connexion' } // Route par défaut pour les erreurs 404
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

