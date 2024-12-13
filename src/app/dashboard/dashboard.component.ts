import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { StripeService } from '../services/stripe.service'; // Import du service Stripe
import { StripeCardElement, Stripe, StripeElements } from '@stripe/stripe-js'; // Types pour Stripe


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  city: string = 'Paris'; // Ville par défaut
  weatherData: any = null; // Contiendra les données météo
  error: string = ''; // Message d'erreur

  // Variables Stripe
  private stripe: Stripe | null = null;
  private card: StripeCardElement | null = null;

 
  // Variables pour QR code
  qrText: string = ''; // Texte pour le QR code
  generatedQrText: string = ''; // Contient le texte généré pour le QR code

  constructor(
    private weatherService: WeatherService,
    private stripeService: StripeService // Injection du service Stripe
  ) {}

  ngOnInit(): void {
    this.getWeather(); // Charger la météo au démarrage
    this.initializeStripe(); // Initialiser Stripe
  }

  // Récupérer la météo
  getWeather(): void {
    this.weatherService.getWeatherByCity(this.city).subscribe(
      (data) => {
        this.weatherData = data;
        this.error = '';
      },
      (error) => {
        this.weatherData = null;
        if (error.status === 401) {
          this.error = 'Clé API invalide. Veuillez vérifier la configuration.';
        } else {
          this.error = 'Ville introuvable ou erreur réseau.';
        }
        console.error('Erreur lors de la récupération des données météo:', error);
      }
    );
  }

  // Méthode appelée lors du changement de ville
  updateCity(city: string): void {
    this.city = city;
    this.getWeather();
  }

  // Initialiser Stripe
  async initializeStripe(): Promise<void> {
    this.stripe = await this.stripeService.getStripe();
    if (this.stripe) {
      const elements: StripeElements = this.stripe.elements();
      this.card = elements.create('card');
      this.card.mount('#card-element'); // Monter l'élément de la carte dans le DOM
    }
  }

  // Gérer le paiement
  async handlePayment(event: Event): Promise<void> {
    event.preventDefault();

    if (this.stripe && this.card) {
      const { token, error } = await this.stripe.createToken(this.card);
      if (error) {
        console.error('Erreur lors de la création du token Stripe :', error.message);
      } else {
        console.log('Token Stripe :', token);
        this.processPayment(token);
      }
    }
  }

  // Envoyer le token au serveur pour traiter le paiement
  async processPayment(token: any): Promise<void> {
    const response = await fetch('http://localhost:3000/api/charge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token.id, amount: 1000 }), // Montant du paiement (en centimes)
    });

    const result = await response.json();
    if (result.success) {
      console.log('Paiement réussi!');
    } else {
      console.log('Paiement échoué!');
    }
  }
   // Générer le QR code
   generateQRCode(): void {
    this.generatedQrText = this.qrText;
  }
}
