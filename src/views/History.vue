<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>
    <Loader v-if="isLoading"/>
    <p class="center" v-else-if="!records.length">
      Записей пока нет
    </p>
    <section v-else>
      <HistoryTable :records="shownItems"/>
      <Paginate :page-count="pageCount"
                :click-handler="onPaginationHandler"
                container-class="pagination"
                page-class="waves-effect"
                prev-text="Назад"
                next-text="Вперед"
                v-model="page"
      />
    </section>
  </div>
</template>

<script>
  import HistoryTable from '@/components/HistoryTable';
  import Paginate from 'vuejs-paginate';
  import paginationMixin from '@/mixins/pagination.mixin';
  import {Pie} from 'vue-chartjs';

  export default {
    name: 'History',
    extends: Pie,
    components: {
      HistoryTable,
      Paginate
    },
    mixins: [paginationMixin],
    data() {
      return {
        isLoading: true,
        records: []
      }
    },
    methods: {
      setup(categories) {
        this.setupPagination(this.records.map(record => {
          return {
            ...record,
            category: categories.find(it => it.id === record.categoryId).title
          }
        }));
      }
    },
    async mounted() {
      const categories = await this.$store.dispatch('fetchCategories');
      this.records = await this.$store.dispatch('fetchRecords');
      this.setup(categories);
      this.renderChart({
        labels: categories.map(it => it.title),
        datasets: [{
          label: 'Расходы по категориям',
          data: categories.map(category => {
            return this.records.reduce((acc, record) => {
              if (record.categoryId === category.id && record.type === 'outcome') {
                acc += +record.amount;
              }
              return acc;
            }, 0);
          }),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      });
      this.isLoading = false;
    }
  }
</script>
