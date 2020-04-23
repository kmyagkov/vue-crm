<template>
  <div>
    <div class="page-title">
      <h3>Планирование</h3>
      <h4>{{ info.bill | currency('RUB') }}</h4>
    </div>
    <Loader v-if="isLoading"/>
    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Создать категорию</router-link>
    </p>
    <section v-else>
      <div v-for="category of categories"
           :key="category.id"
      >
        <p v-tooltip="category.tooltip">
          <strong>{{ category.title }}:</strong>
          {{ category.spend | currency('RUB') }} из {{ category.limit | currency('RUB') }}
        </p>
        <div class="progress">
          <div class="determinate"
               :style="{width: category.progressPercent + '%'}"
               :class="category.progressColor"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import currencyFilter from '@/filters/currency';

  export default {
    name: 'Planning',
    data() {
      return {
        isLoading: true,
        categories: []
      }
    },
    computed: {
      ...mapGetters(['info']),
    },
    async mounted() {
      const records = await this.$store.dispatch('fetchRecords');
      const categories = await this.$store.dispatch('fetchCategories');

      this.categories = categories.map(it => {
        const spend = records.filter(it => it.id === it.id && it.type === 'outcome').reduce((acc, it) => {
          return acc += it.amount;
        }, 0);

        const percent = 100 * spend / it.limit;
        const progressPercent = percent > 100 ? 100 : percent;
        const progressColor = percent < 60
          ? 'green'
          : percent < 100
            ? 'yellow'
            : 'red';
        const tooltipValue = it.limit - spend;
        const tooltip = `${tooltipValue < 0 ? 'Превышение на ' : 'Осталось'} ${currencyFilter(Math.abs(tooltipValue))}`;

        return {
          ...it,
          progressPercent,
          progressColor,
          spend,
          tooltip
        }
      });

      this.isLoading = false;
    }
  }
</script>
