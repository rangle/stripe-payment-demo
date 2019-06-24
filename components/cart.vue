<template>
  <div class="w10 pv4 ph5 bl min-vh-100 bg-page b--light-gray">
    <div class="flex justify-between items-center">
      <h2 class="tracked-mega">Cart</h2>
      <div v-if="enableCheckout && cart.length !== 0" class="flex">
        <info class="mt2 mr3">
          <span class="b">Stripe offers Hosted and Custom Checkout.<br/><br/></span>
          <span>
            <span class="i">Hosted Checkout</span> allows Stripe to handle the checkout process by redirecting the user to a Stripe hosted checkout page.
            <br/><br/>
            <span class="i">Custom Checkout</span> allows you to customize the entire checkout process without ever redirecting away from your website.
          </span>

        </info>
        <toggle-button
          @change="() => customCheckout = !customCheckout"
          :labels="{checked: 'Hosted', unchecked: 'Custom'}"
          :color="{checked: '#556cd6', unchecked: '#979797'}"
          :width="83"
          :height="35"
          :value="!customCheckout"
        ></toggle-button>
      </div>
    </div>
    <div class="mt4">
      <div
        v-if="cart.length === 0"
        class="f6"
      >
        Your cart is currently empty.
      </div>
      <div v-else="cart.length === 0">
        <div
          class="w-100 flex justify-between pv3"
          v-for="(product) in cart" :key="product.id"
        >
          <img
            :src="require(`~/assets/${product.image}.jpg`)"
            class="img-center br2 ba b--light-gray"
          />
          <div class="tr v-mid">
            <p class="tracked f6">{{product.name}}</p>
            <p class="mt2 b tracked f6">${{product.printedPrice}}</p>
          </div>
        </div>
        <div class="bt bb pv3 f6 tracked b--silver">
          <div class="flex justify-between">
            <p>Subtotal</p>
            <p class="b">${{ formatPrice(getTotal()) }}</p>
          </div>
          <div class="flex justify-between mt3">
            <p>Tax</p>
            <p class="b">${{ formatPrice(getTotal() * 0.13) }}</p>
          </div>
        </div>
        <div class="pv4 tracked flex justify-between b items-center">
          <p class="">Total</p>
          <p class="f3">${{ formatPrice(Math.round(getTotal() * 1.13 * 100) / 100) }}</p>
        </div>
        <NuxtLink to="/ecommerce/checkout" v-if="enableCheckout && customCheckout">
          <SquareButton
            class="mt4"
            label="Checkout"
          >
          </SquareButton>
        </NuxtLink>
        <SquareButton
          class="mt4"
          v-if="!customCheckout"
          :onclick="createCheckout"
          label="Checkout"
        >
        </SquareButton>
      </div>
    </div>
  </div>
</template>

<script>
  import { ToggleButton } from 'vue-js-toggle-button'
  const stripe = Stripe('pk_test_gJtStmUbtzSTskca4IWtPOZd');

  import SquareButton from '~/components/squareButton.vue';
  import Info from '~/components/info.vue';

  export default {
    props: {
      cart: {
        type: Array,
        default: [],
      },
      enableCheckout: {
        type: Boolean,
        default: true,
      }
    },
    data () {
      return {
        customCheckout: true,
      }
    },
    methods: {
      getTotal() {
        return this.cart
          .reduce((total, product) =>  total + product.price, 0);
      },
      formatPrice(price) {
        const strPrice = String(price);
        return `${strPrice.slice(0, strPrice.length - 2)}.${strPrice.slice(strPrice.length - 2)}`;
      },
      async createCheckout() {
        const total = Math.round(this.getTotal() * 1.13 * 100) / 100;
        if (total) {
          this.$axios
            .$post('/api/checkout/create', {
              cart: this.cart,
            })
            .then((session) => {
              stripe
                .redirectToCheckout({sessionId: session.id})
                .then(function (result) {
                  // If `redirectToCheckout` fails due to a browser or network
                  // error, display the localized error message to your customer
                  // using `result.error.message`.
                });
            });
        }
      },
    },
    components: {
      ToggleButton,
      SquareButton,
      Info,
    },
  }
</script>

<style>
  .w10 {
    width: 30rem;
    min-width: 30rem;
  }

  .img-center {
    object-fit: cover;
    object-position: center;
    width: 45px;
    height: 45px;
  }

  .bg-page {
    background-color: #f4f4f4;
  }

</style>

