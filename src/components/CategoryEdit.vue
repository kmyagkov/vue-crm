<template>
  <div>
    <div class="page-subtitle">
      <h4>Редактировать</h4>
    </div>

    <form @submit.prevent="submit">
      <div class="input-field" >
        <select ref="select" v-model="currentCategory">
          <option v-for="category of categories"
                  :key="category.id"
                  :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <div class="input-field">
        <input id="name"
               type="text"
               v-model="title"
               :class="{'invalid': isTitleValid}"
        >
        <label for="name">Название</label>
        <span class="helper-text invalid"
              v-if="isTitleValid"
        >
          Введите название
        </span>
      </div>

      <div class="input-field">
        <input id="limit"
               type="number"
               v-model="limit"
               :class="{'invalid': isMinValueValid}"
        >
        <label for="limit">Лимит</label>
        <span class="helper-text invalid" v-if="isMinValueValid">
          Минимальная величина - {{ $v.limit.$params.minValue.min }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import {validationMixin} from 'vuelidate';
  import {minValue, required} from 'vuelidate/lib/validators';

  export default {
    name: 'CategoryEdit',
    data() {
      return {
        select: null,
        title: '',
        limit: 100,
        currentCategory: null
      }
    },
    props: {
      categories: {
        type: Array,
        required: true
      }
    },
    computed: {
      isTitleValid() {
        return this.$v.title.$dirty && !this.$v.title.required;
      },
      isMinValueValid() {
        return (this.$v.limit.$dirty && !this.$v.limit.minValue) || (this.$v.limit.$dirty && !this.$v.limit.required);
      }
    },
    methods: {
      async submit() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }

        try {
          const updatedCategory = {
            id: this.currentCategory,
            title: this.title,
            limit: this.limit
          };

          await this.$store.dispatch('updateCategory', updatedCategory);
          this.$message('Данные категории обновлены');
          this.$emit('updated', updatedCategory);
        } catch (e) {}
      }
    },
    mixins: [validationMixin],
    validations: {
      title: {
        required
      },
      limit: {
        minValue: minValue(100)
      }
    },
    watch: {
      currentCategory(id) {
        const {title, limit} = this.categories.find(it => it.id === id);
        this.title = title;
        this.limit = limit;
      }
    },
    created() {
      const {id, title, limit} = this.categories[0];
      this.currentCategory = id;
      this.title = title;
      this.limit = limit;
    },
    mounted() {
      M.updateTextFields();
      this.select = M.FormSelect.init(this.$refs.select);
    },
    destroyed() {
      if (this.select && this.select.destroy) {
        this.select.destroy();
      }
    }
  }
</script>
