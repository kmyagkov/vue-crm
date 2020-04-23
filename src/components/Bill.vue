<template>
  <div class="card light-blue bill-card">
    <div class="card-content white-text">
      <span class="card-title">Счет в валюте</span>
      <p class="currency-line"
         v-for="currency of convertedCurrencies"
         :key="currency.name"
      >
        <span>{{ currency.rate | currency(currency.name) }}</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Bill',
    props: ['rates'],
    computed: {
      baseCurrency() {
        return this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR']);
      },
      convertedCurrencies() {
        return Object.entries(this.rates).map(it => {
          return {
            name: it[0],
            rate: Math.round(this.baseCurrency * this.rates[it[0]])
          }
        });
      }
    }
  }
</script>
