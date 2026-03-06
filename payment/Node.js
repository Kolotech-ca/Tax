// server.js
const express = require('express');
const app = express();
const stripe = require('stripe')('mk_6DOqYBCPl44Gep');
app.use(express.static('public'));
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'KoloTech Service',
          },
          unit_amount: 5000, // $50
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://www.kolotech.ca/payment/success.html',
      cancel_url: 'https://www.kolotech.ca/payment/cancel.html',
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4242, () => console.log('Server running on port 4242'));