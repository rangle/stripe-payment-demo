const express = require('express');
const consola = require('consola');
const { Nuxt, Builder } = require('nuxt');
const bodyParser = require('body-parser');
const app = express();
const stripe = require('stripe')('sk_test_NrWiOpb4YkWmn4B4KRB2160P');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js');
config.dev = !(process.env.NODE_ENV === 'production');

// API Routes

// Create PaymentIntent
app.post('/api/paymentIntent/create', async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: 'usd',
      customer: req.body.customerId,
    });

    res.send(paymentIntent);
  } catch (err) {
    next(err);
  }
});

// Create Checkout
app.post('/api/checkout/create', async (req, res, next) => {
  const cart = req.body.cart.map((product) => {
    return {
      name: product.name,
      amount: Math.round(product.price * 1.13 * 100) / 100,
      currency: 'usd',
      quantity: 1,
    }
  });
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart,
      success_url: 'http://localhost:3000/ecommerce/success',
      cancel_url: 'http://localhost:3000/ecommerce/failure',
    });

  res.send(session);
  } catch (err) {
    next(err);
  }
});


async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config);

  const { host, port } = nuxt.options.server;

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render);

  // Listen the server
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

// Plans
app.get('/api/plans/:id', async (req, res, next) => {
  try {
    stripe.plans.list(
      { product: req.param.id },
      (err, { data }) => {
        res.send(data);
      }
    );
  } catch (err) {
    next(err);
  }
});

// Customer
app.get('/api/customer/', async (req, res, next) => {
  const { coupon, email, name } = req.body;
  try {
    stripe.customers.create({
      coupon,
      email,
      name,
    }, function(err, customer) {
      res.send(customer);
    });
  } catch (err) {
    next(err);
  }
});


start();
