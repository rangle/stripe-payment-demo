<template>
  <div>
    <div class="fixed absolute--fill sub-bg z--1"></div>
    <div class="flex justify-around items-center mt5">
      <h1 class="tc dark-gray">Checkout</h1>
    </div>
    <div class="flex flex-wrap justify-center ph5 dark-gray mh3 mv5">
      <div
        class="flex justify-center mh5 mb5"
      >
        <sub-card :plan="plan" :enableCheckout="false"></sub-card>
      </div>
      <div class="mh5">
        <form>
          <div class="flex justify-between">
            <input class="mr3" placeholder="First Name" v-model="firstName"/>
            <input placeholder="Last Name" v-model="lastName"/>
          </div>
          <input placeholder="Email" v-model="email"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  import SubCard from '~/components/subCard.vue';

  export default {
    created () {
      this.plan = this.$route.params.plan;
    },
    data () {
      return {
        plan: {},
      }
    },
    components: {
      SubCard,
    }
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
    border: white 1px solid;
    outline: 0;
    border-radius: 4rem;
    background: white;
    box-shadow: 0 2px 10px rgba(0,0,0, .2);
  }

  input::placeholder {
    color: #838383;
  }
</style>
