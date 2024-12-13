import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  connexionForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.connexionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmitConnexion() {
    if (this.connexionForm.valid) {
      console.log('Connexion réussie :', this.connexionForm.value);
    } else {
      console.error('Formulaire de connexion invalide');
    }
  }
}
