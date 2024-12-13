// connexion.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent {
  connexionForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.connexionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required]]
    });
  }

  /**
   * Méthode pour soumettre le formulaire de connexion
   */
  onSubmitConnexion() {
    if (this.connexionForm.valid) {
      const formData = this.connexionForm.value;

      // Récupérer les données de l'utilisateur depuis le localStorage
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Vérifier les identifiants
        if (parsedUser.email === formData.email && parsedUser.motDePasse === formData.motDePasse) {
          console.log('Connexion réussie !');
          this.router.navigate(['/dashboard']);  // Rediriger vers le tableau de bord
        } else {
          console.error('Identifiants incorrects');
          alert('Identifiants incorrects');
        }
      } else {
        console.error('Aucun utilisateur trouvé');
        alert('Aucun utilisateur trouvé');
      }
    } else {
      console.error('Formulaire invalide');
    }
  }
}
