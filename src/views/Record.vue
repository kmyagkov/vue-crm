<template>
  <div>
    <div class="page-title">
      <h3>Новая запись</h3>
    </div>

    <Loader v-if="isLoading"/>

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Создать категорию</router-link>
    </p>

    <form class="form" v-else @submit.prevent="submit">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option v-for="category of categories"
                  :key="category.id"
                  :value="category.id"
          >
            {{ category.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <p>
        <label>
          <input class="with-gap"
                 name="type"
                 type="radio"
                 value="income"
                 v-model="type"
          />
          <span>Доход</span>
        </label>
      </p>

      <p>
        <label>
          <input class="with-gap"
                 name="type"
                 type="radio"
                 value="outcome"
                 v-model="type"
          />
          <span>Расход</span>
        </label>
      </p>

      <div class="input-field">
        <input id="amount"
               type="number"
               v-model.number="amount"
               :class="{'invalid': isAmountValid}"
        >
        <label for="amount">Сумма</label>
        <span class="helper-text invalid"
              v-if="isAmountValid"
        >
          Минимальная величина - {{ $v.amount.$params.minValue.min }}
        </span>
      </div>

      <div class="input-field">
        <input id="description"
               type="text"
               v-model="desc"
               :class="{'invalid': isDescValid}"
        >
        <label for="description">Описание</label>
        <span class="helper-text invalid"
              v-if="isDescValid"
        >
          Введите описание
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
  import {validationMixin} from 'vuelidate';
  import {minValue, required} from 'vuelidate/lib/validators';
  import {mapGetters} from 'vuex';

  export default {
    name: "Record",
    mixins: [validationMixin],
    data() {
      return {
        isLoading: true,
        categories: [],
        select: null,
        category: null,
        type: 'income',
        amount: 1,
        desc: ''
      }
    },
    computed: {
      ...mapGetters(['info']),
      isDescValid() {
        return this.$v.desc.$dirty && !this.$v.desc.required;
      },
      isAmountValid() {
        return (this.$v.amount.$dirty && !this.$v.amount.minValue) || (this.$v.amount.$dirty && !this.$v.amount.required);
      },
      isPossibleCreate() {
        return this.type === 'income' || this.info.bill >= this.amount;
      }
    },
    methods: {
      async submit() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }

        if (this.isPossibleCreate) {
         try {
           await this.$store.dispatch('createRecord', {
             categoryId: this.category,
             amount: this.amount,
             description: this.desc,
             type: this.type,
             date: new Date().toJSON()
           });

           const bill = this.type === 'income'
             ? this.info.bill + this.amount
             : this.info.bill - this.amount;

           await this.$store.dispatch('updateInfo', {bill});
           this.$message('Запись успешно добавлена');
           this.$v.reset();

           this.amount = 1;
           this.desc = '';
         } catch (e) {}
        } else {
          this.$message('Недостаточно средств на счете');
        }
      }
    },
    validations: {
      desc: {
        required
      },
      amount: {
        minValue: minValue(1)
      }
    },
    async mounted() {
      this.categories = await this.$store.dispatch('fetchCategories');
      this.isLoading = false;

      if (this.categories[0]) {
        this.category = this.categories[0].id;
      }

      this.$nextTick(() => {
        this.select = M.FormSelect.init(this.$refs.select);
        M.updateTextFields();
      });
    },
    destroyed() {
      if (this.select && this.select.destroy) {
        this.select.destroy();
      }
    }
  }
</script>
