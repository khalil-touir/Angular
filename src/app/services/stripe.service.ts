// src/app/services/stripe.service.ts
import { Injectable } from '@angular/core';
import { loadStripe, Stripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripePromise = loadStripe('pk_test_51QUF31HxOQgNMo49qzOTdYPkWzkLXanUADicQJGzQyd6KdenSnhiOjWmNan1omDhTFmoY5xLF9cn3pOFcz4M4xP900G4V4PeDR'); // Remplacez par votre clé publique Stripe

  // Récupérer l'instance de Stripe
  async getStripe(): Promise<Stripe | null> {
    return this.stripePromise;
  }
}
