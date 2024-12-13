import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
})
export class InscriptionComponent {
  inscriptionForm: FormGroup; // Déclaration de la variable du formulaire

  constructor(private fb: FormBuilder, private router: Router) {
    // Initialisation du formulaire avec les contrôles et validations
    this.inscriptionForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ]+$')]],
      prenom: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(8)]],
      confirmationMotDePasse: ['', Validators.required],
    }, {
      validators: this.passwordMatchValidator // Validation personnalisée pour les mots de passe
    });
  }

  /**
   * Méthode pour valider que le mot de passe et la confirmation sont identiques.
   */
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('motDePasse')?.value;
    const confirmPassword = group.get('confirmationMotDePasse')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  /**
   * Redirige vers la page de connexion après l'inscription.
   */
  redirectToConnexion() {
    this.router.navigate(['/connexion']); // Redirige vers la page de connexion
  }

  /**
   * Soumission du formulaire pour enregistrer les données.
   */
  onSubmit() {
    if (this.inscriptionForm.valid) {
      const userData = this.inscriptionForm.value;

      // Enregistrer les données dans le localStorage (ou sessionStorage)
      localStorage.setItem('user', JSON.stringify(userData));

      console.log('Utilisateur inscrit :', userData);
      alert('Inscription réussie !');
      this.redirectToConnexion(); // Redirige vers la page de connexion après inscription
    } else {
      console.error('Formulaire invalide');
    }
  }
}
