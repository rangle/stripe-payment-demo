<template>
  <v-popover offset="16">
    <div class="br4 pointer info-icon flex justify-center items-center">
      <fa :icon="['fab', 'stripe-s']" style="font-size: 9px; color: white"></fa>
    </div>
    <template slot="popover">
      <div class="f6">
        <slot></slot>
      </div>
    </template>
  </v-popover>
</template>

<script>
  import { VPopover } from 'v-tooltip';
  export default {
    components: { VPopover }
  }
</script>

<style>
  .info-icon {
    width: 1.4rem;
    height: 1.4rem;
    background-color: #556cd6;
    border: none;
    box-shadow: 0 2px 3px rgba(0,0,0, .5);
  }

  .popover-inner {
    max-width: 18rem;
    background: #556cd6;
    opacity: 0.95;
    color: white;
    padding: 1.5rem;
    border-radius: 4px;
    box-shadow: 0 5px 30px rgba(0,0,0, .4);
  }
</style>
