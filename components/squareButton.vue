<template>
  <button
    class="w-100 pa2 br1 b--gray bg-white pointer"
    @click="onclick()"
  >
    {{ label }}
  </button>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
        default: '',
      },
      onclick: {
        type: Function,
        default: () => {},
      }
    }
  }
</script>

<style>
</style>
