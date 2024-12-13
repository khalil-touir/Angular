const express = require('express');
const stripe = require('stripe')('sk_test_51QUF31HxOQgNMo49me1BvcYojiA3rYBacDFe785rQn5ddAGFRMlZkVn26ABiAqiKl2OB0JuOSa4nJerigclHbw0t00VHKKfAp8'); // Remplacez par votre clé secrète
var cors = require('cors')
const app = express();
app.use(cors())
app.use(express.json());

app.post('/api/charge', async (req, res) => {
  try {
    const { token, amount } = req.body;
    const charge = await stripe.charges.create({
      amount: amount, // Montant en centimes
      currency: 'eur',
      source: token,
      description: 'Paiement en ligne',
    });
    res.json({ success: true, charge });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Serveur en écoute sur le port 3000');
});
