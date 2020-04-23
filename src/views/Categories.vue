<template>
  <div>
    <div class="page-title">
      <h3>Категории</h3>
    </div>
    <section>
      <Loader v-if="isLoading"/>
      <div class="row" v-else>
        <div class="col s12 m6">
          <CategoryCreate @createCategory="addCategory"/>
        </div>
        <div class="col s12 m6">
          <CategoryEdit :categories="categories"
                        @updated="updateCategories"
                        :key="categories.length + updateCount"
                        v-if="categories.length"
          />
          <p class="center" v-else>Категории отсутствуют</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import CategoryCreate from '@/components/CategoryCreate';
  import CategoryEdit from '@/components/CategoryEdit';

  export default {
    name: "Categories",
    components: {
      CategoryCreate,
      CategoryEdit
    },
    data() {
      return {
        categories: [],
        isLoading: true,
        updateCount: 0
      }
    },
    methods: {
      addCategory(category) {
        this.categories.push(category);
      },
      updateCategories(category) {
        const id = this.categories.findIndex(it => it.id === category.id);
        this.categories[id].title = category.title;
        this.categories[id].limit = category.limit;
        this.updateCount++;
      }
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.isLoading = false;
    }
  }
</script>
