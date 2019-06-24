<template>
  <div>
    <div class="fixed absolute--fill sub-bg z--1"></div>
    <div class="flex justify-around items-center mt5">
      <h1 class="tc dark-gray">Subscription</h1>
      <toggle-button
        @change="() => isMonthly = !isMonthly"
        :labels="{checked: 'Monthly', unchecked: 'Yearly'}"
        :color="{checked: '#414141', unchecked: '#414141'}"
        :width="130"
        :height="45"
        :value="!isMonthly"
        :font-size="18"
      ></toggle-button>
    </div>
    <div class="flex flex-wrap justify-center ph5 dark-gray">
      <div
        class="flex justify-center mh3 mv5"
        v-for="(plan) in plans(monthlyPlans)"
        :key="plan.id"
      >
        <sub-card :plan="plan"></sub-card>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import { ToggleButton } from 'vue-js-toggle-button'

  import SubCard from '~/components/subCard.vue';

  export default {
    created () {
      this.$axios
        .$get('/api/plans/prod_FIYBRGXwaLvFME')
        .then(plans => {
          this.updatePlans(plans.reverse());
        });
    },
    methods: {
      updatePlans (plans) {
        this.$store.commit('updatePlans', plans)
      },
      ...mapMutations({
        toggle: 'updatePlans'
      }),
      plans () {
        const plans = this.isMonthly ? this.monthlyPlans : this.yearlyPlans;
        return plans.map((plan, index) => {
          let color;
          if(index % 3 === 0) {
            color = 'pink';
          } else if (index % 2 === 0) {
            color = 'purple';
          } else {
            color = 'green';
          }
          return {...plan, color};
        })
      }
    },
    data () {
      return {
        isMonthly: true,
      }
    },
    computed: {
      monthlyPlans () {
        return this.$store.state.plans
          .filter(plan => plan.interval === 'month');
      },
      yearlyPlans () {
        return this.$store.state.plans
          .filter(plan => plan.interval === 'year');
      },
    },
    components: { SubCard, ToggleButton }
  }
</script>

<style>
</style>
