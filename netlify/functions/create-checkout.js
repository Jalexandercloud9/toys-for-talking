// Netlify serverless function — creates a Stripe Checkout Session
// with a server-side locked quantity so parents cannot change it.

// Prices per child (in cents).
const PRICES = {
  'llsc-june-inperson': { amount: 19900, name: 'Little Lamps Speech Camp — June (In-Person)' },
  'llsc-july-inperson': { amount: 19900, name: 'Little Lamps Speech Camp — July (In-Person)' },
  'llsc-june-virtual':  { amount:  9900, name: 'Little Lamps Speech Camp — June (Virtual)'    },
  'llsc-july-virtual':  { amount:  9900, name: 'Little Lamps Speech Camp — July (Virtual)'    },
  'evaluation':         { amount: 14900, name: 'Speech & Language Evaluation'                  },
};

exports.handler = async (event) => {
  console.log('create-checkout called, method:', event.httpMethod);

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Initialise Stripe inside the handler so any key error is caught and logged
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    console.log('Stripe key present:', !!process.env.STRIPE_SECRET_KEY);

    const { campId, numKids } = JSON.parse(event.body);
    console.log('campId:', campId, 'numKids:', numKids);

    const product = PRICES[campId];
    if (!product) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid camp ID' }) };
    }

    const quantity = Math.max(1, Math.min(10, parseInt(numKids, 10) || 1));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: product.name },
          unit_amount: product.amount,
        },
        quantity,
      }],
      mode: 'payment',
      success_url: 'https://www.toysfortalkingslp.com/?payment=success',
      cancel_url:  'https://www.toysfortalkingslp.com/#/payment',
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url }),
    };
  } catch (err) {
    console.error('Stripe error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
