export const state = () => ({
  cart: [],
  paymentIntent: {
    id: '',
    clientSecret: '',
  },
  products: [
    {
      id: 0,
      image: 'aquinnah_vase',
      name: 'Aquinnah Vase',
      printedPrice: '75.00',
      price: 7500,
    },
    {
      id: 1,
      image: 'color_wheel_mini_catchall_bowl',
      name: 'Mini Catchall Bowl',
      printedPrice: '28.00',
      price: 2800,
    },
    {
      id: 2,
      image: 'nesting_seagrass_bins',
      name: 'Nesting Seagrass Bins',
      printedPrice: '24.00',
      price: 2400,
    },
    {
      id: 3,
      image: 'porto_ceramic_vase',
      name: 'Porto Ceramic Vase',
      printedPrice: '24.00',
      price: 2400,
    },
    {
      id: 4,
      image: 'relic_bud_vases',
      name: 'Relic Bud Vases',
      printedPrice: '14.00',
      price: 1400,
    },
  ],
  plans: [],
})

export const mutations = {
  addToCart (state, item) {
    state.cart.push(item);
  },
  completePayment (state) {
    state.cart = [];
    state.paymentIntent = {};
  },
  updatePaymentIntent (state, paymentIntent) {
    state.paymentIntent = {
      ...paymentIntent
    };
  },
  updatePlans (state, plans) {
    state.plans = plans;
  }
}
