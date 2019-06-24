<template>
  <div class="flex">
    <div class="ma5 mh6 flex-grow-1 flex justify-center">
      <div class="mw6 w-100">
        <h3 class="tracked mb4">Payment Information</h3>
        <form @submit="handleSubmit($event)" class="relative block">
          <div
            class="absolute--fill bg-white-80 absolute z-max flex justify-center"
            v-if="complete"
          >
            <p class="self-center b f3">Payment Success!</p>
          </div>
          <div class="flex justify-between">
            <input class="mr3" placeholder="First Name" v-model="firstName"/>
            <input placeholder="Last Name" v-model="lastName"/>
          </div>
          <input placeholder="Email" v-model="email"/>
          <div class="relative">
            <div id="card-element"></div>
            <info class="absolute card-info">
              <span class="b">Stripe provides this card input element through the Stripe.js library.<br/><br/></span>
              Stripe Elements provides ready-made UI components like inputs and buttons for collecting information from the user. Stripe.js then tokenizes the sensitive information within an Element without ever having it touch your server. It is also highly customizable to fit your unique branding.
            </info>
          </div>
          <div class="mt3 mb2 f6 h3 flex items-end">
            {{ errorMessage }}
          </div>
          <div>
            <SquareButton label="Purchase"></SquareButton>
            <info class="absolute card-info">
              <span class="b">Stripes provides APIs to process payment.<br/><br/></span>
              It tracks the lifecycle of a customer checkout flow and triggers additional authentication steps when required by regulatory mandates, custom Radar fraud rules, or redirect-based payment methods.
            </info>
          </div>
        </form>
        <NuxtLink to="/ecommerce">
          <p class="f6 mt2 tc">Continue Browsing</p>
        </NuxtLink>
      </div>
    </div>
    <cart :cart="cart" :enableCheckout="false"></cart>
  </div>
</template>

<script>
  import { Card, handleCardPayment } from 'vue-stripe-elements-plus';
  import { mapMutations } from 'vuex';
  import Cart from '~/components/cart.vue';
  import SquareButton from '~/components/squareButton.vue';
  import Info from '~/components/info.vue';

  const stripe = Stripe('pk_test_gJtStmUbtzSTskca4IWtPOZd');

  export default {
    created () {
      this.startPayment();
    },
    mounted () {
      const elements = stripe.elements();
      this.card = elements.create('card', {style: this.stripeOptions});
      this.card.mount('#card-element');
    },
    data () {
      return {
        firstName: '',
        lastName: '',
        email: '',
        complete: false,
        errorMessage: '',
        cards: {},
        stripeOptions: {
          style: {
            base: {
              letterSpacing: '0.025em',
              '::placeholder': {
                color: '#838383',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }
      }
    },
    methods: {
      getTotal() {
        return this.cart
          .reduce((total, product) =>  total + product.price, 0);
      },
      updatePaymentIntent (paymentIntent) {
        this.$store.commit('updatePaymentIntent', paymentIntent)
      },
      ...mapMutations({
        toggle: 'updatePaymentIntent'
      }),
      completePayment () {
        this.$store.commit('completePayment')
      },
      ...mapMutations({
        toggle: 'completePayment'
      }),
      async startPayment() {
        const total = Math.round(this.getTotal() * 1.13 * 100) / 100;
        if (total) {
          this.$axios
            .$post('/api/paymentIntent/create', {
              amount: total,
              // customerId: this.customerId,
            })
            .then((paymentIntent) => {
              this.updatePaymentIntent({
                id: paymentIntent.id,
                clientSecret: paymentIntent.client_secret,
              });
            });
        }
      },
      handleSubmit (ev) {
        ev.preventDefault();
        stripe.handleCardPayment(
          this.paymentIntent.clientSecret,
          this.card,
        )
        .then((data) => {
          console.log(data);
          if (data.error) {
            this.errorMessage = data.error.message;
          } else {
            this.complete = true;
            this.completePayment();
          }
        });
      }
    },
    computed: {
      cart () {
        return this.$store.state.cart;
      },
      paymentIntent () {
        return this.$store.state.paymentIntent;
      }
    },
    components: { Card, Cart, SquareButton, Info },
  }
</script>

<style scoped>
  input,
  .StripeElement {
    display: block;
    margin-bottom: 20px;
    width: 100%;
    padding: 10px 14px;
    font-size: 0.9em;
    border: #7c7c7c 1px solid;
    outline: 0;
    border-radius: 2px;
    background: white;
  }

  input::placeholder {
    color: #838383;
  }

  input:focus,
  .StripeElement--focus {
    box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px, rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
  }

  .card-info {
    bottom: 0.5rem;
    right: -2.5rem
  }
</style>
