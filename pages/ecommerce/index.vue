<template>
  <div class="flex">
    <div class="flex flex-wrap">
      <div class="w5 mh3 mv4" v-for="(product) in products" :key="product.id">
        <img :src="require(`~/assets/${product.image}.jpg`)" />
        <div class="content-center pa2 title-grey f7">
          <p class="pa2 lh-title tc tracked">{{product.name.toUpperCase()}}</p>
          <p class="tc i">${{product.printedPrice}}</p>
          <SquareButton
            class="mt4"
            :onclick="() => addToCart(product)"
            label="ADD TO CART"
          ></SquareButton>
        </div>
      </div>
    </div>
    <cart :cart="cart"></cart>

  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import Cart from '~/components/cart.vue';
  import SquareButton from '~/components/squareButton.vue';

  export default {
    computed: {
      products () {
        return this.$store.state.products;
      },
      cart () {
        return this.$store.state.cart;
      }
    },
    methods: {
      addToCart (product) {
        this.$store.commit('addToCart', product)
      },
      ...mapMutations({
        toggle: 'addToCart'
      })
    },
    components: { Cart, SquareButton },
  }
</script>
<style>
  .bg-white {
    background: white;
  }

  .title-grey {
    color: #262626;
  }
</style>
