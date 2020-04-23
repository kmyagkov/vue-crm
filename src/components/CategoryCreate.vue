<template>
  <div>
    <div class="page-subtitle">
      <h4>Создать</h4>
    </div>

    <form @submit.prevent="submit">
      <div class="input-field">
        <input id="name"
               type="text"
               v-model="title"
               :class="isTitleValid"
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
        <span class="helper-text invalid"
              v-if="isMinValueValid"
        >
          Минимальная величина - {{ $v.limit.$params.minValue.min }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { required, minValue } from 'vuelidate/lib/validators';

  export default {
    name: 'CategoryCreate',
    data() {
      return {
        title: '',
        limit: 100
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
          const category = await this.$store.dispatch('createCategory', {
            title: this.title,
            limit: this.limit
          });

          this.title = '';
          this.limit = 100;
          this.$message('Категория создана');
          this.$emit('createCategory', category);
          this.$v.reset();
        } catch (e) {}
      }
    },
    mounted() {
      M.updateTextFields();
    }
  }
</script>
