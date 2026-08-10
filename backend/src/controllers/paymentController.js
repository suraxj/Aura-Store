import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

// @desc Create Stripe Payment Intent
// @route POST /api/payment/create-intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid payment amount' });
    }

    if (stripe) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // convert to cents/paise
        currency: 'inr',
        payment_method_types: ['card'],
      });

      return res.json({
        clientSecret: paymentIntent.client_secret,
        transactionId: paymentIntent.id
      });
    }

    // Mock payment response when Stripe key is not configured
    res.json({
      clientSecret: `mock_client_secret_${Date.now()}`,
      transactionId: `TXN-STRIPE-MOCK-${Date.now()}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
