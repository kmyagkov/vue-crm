<template>
  <div>
    <Loader v-if="isLoading"/>
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a class="breadcrumb">
          {{ record.type === 'income' ? 'Доход' : 'Расход' }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card"
               :class="record.type === 'income' ? 'green' : 'red'"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ record.amount | currency('RUB') }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ record.date | date('datetime') }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запись не найдена</p>
  </div>
</template>

<script>
  export default {
    name: 'Detail',
    data() {
      return {
        record: null,
        isLoading: true
      }
    },
    async mounted() {
      const id = this.$route.params.id;
      const record = await this.$store.dispatch('fetchRecordById', id);
      const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);

      this.isLoading = false;
      this.record = {
        ...record,
        categoryName: category.title
      }

    }
  }
</script>
