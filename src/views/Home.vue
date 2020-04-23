<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small"
              @click="refresh"
      >
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>

    <div class="row" v-else>
      <div class="col s12 m6 l4">
        <Bill :rates="currency.rates"/>
      </div>
      <div class="col s12 m6 l8">
        <Currency :rates="currency.rates"
                  :date="currency.date"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import Bill from '@/components/Bill';
  import Currency from '@/components/Currency';

  export default {
    name: "Home",
    data() {
      return {
        loading: true,
        currency: null
      }
    },
    components: {
      Bill,
      Currency
    },
    methods: {
      async refresh() {
        this.loading = true;
        this.currency = await this.$store.dispatch('fetchCurrency');
        this.loading = false;
      }
    },
    async mounted() {
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    }
  }
</script>
