<template>
  <div class="w6 bg-white br3 card-shadow w6">
    <div class="pa5 flex flex-column items-center">
      <div class="self-start">
        <div class="dib">
          <p class="f5 b tracked gray">
            {{ plan.nickname.split('-')[0].toUpperCase() }}
          </p>
          <div
            class="w-70 mt3 underline"
            v-bind:class="{
              'bg-pink':(plan.color === 'pink'),
              'bg-purple':(plan.color === 'purple'),
              'bg-green':(plan.color === 'green')
            }"
          ></div>
        </div>
      </div>
      <div class="mv5 tr">
        <p class="f1 b">${{ formatPrice(plan.amount) }}</p>
        <p class="gray">per {{ plan.interval }}</p>
      </div>
      <div class="f6">
        <div class="mh2 mv3">
          <fa icon="check" class="mr2"></fa>
          Lorem ipsum dolor sit amet
        </div>
        <div class="mh2 mv3">
          <fa icon="check" class="mr2"></fa>
          Lorem ipsum dolor sit amet
        </div>
        <div class="mh2 mv3">
          <fa icon="check" class="mr2"></fa>
          Lorem ipsum dolor sit amet
        </div>
      </div>
    </div>
    <nuxt-link
      :to="{name: enableCheckout ? 'subscription-checkout' : 'subscription', params: { plan }}"
      class="no-underline"
    >
      <div
        class="h3 w-100 br3 br--bottom tc pt3 pointer"
        v-bind:class="{
          'bg-pink':(plan.color === 'pink'),
          'bg-purple':(plan.color === 'purple'),
          'bg-green':(plan.color === 'green')
        }"
      >
        <span class="white b f4">{{ enableCheckout ? 'SELECT' : 'CHANGE' }}</span>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
  export default {
    props: {
      plan: {
        type: Object,
        default: {},
      },
      enableCheckout: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      formatPrice(price) {
        const strPrice = String(price);
        return `${strPrice.slice(0, strPrice.length - 2)}.${strPrice.slice(strPrice.length - 2)}`;
      },
    }
  }
</script>

<style>
  .w6 {
    width: 22rem;
  }

  .bg-pink {
    background-color: #f58c8b;
  }

  .bg-purple {
    background-color: #ad8cf5;
  }

  .bg-green {
    background-color: #00e2a4;
  }

  .underline {
    height: 2px;
  }

  .card-shadow {
    box-shadow: 0 8px 20px rgba(0,0,0, .3);
  }
</style>
