<template>
  <form class="card auth-card"
        @submit.prevent="submit"
  >
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email"
               type="text"
               v-model.trim="email"
               :class="{'invalid': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small v-if="$v.email.$dirty && !$v.email.required"
               class="helper-text invalid">
          Поле e-mail не должно быть пустым
        </small>
        <small v-else-if="$v.email.$dirty && !$v.email.email"
               class="helper-text invalid">
          Введите корректный e-mail
        </small>
      </div>
      <div class="input-field">
        <input id="password"
               type="password"
               v-model.trim="password"
               :class="{'invalid': ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength)}"
        >
        <label for="password">Пароль</label>
        <small v-if="$v.password.$dirty && !$v.password.required"
               class="helper-text invalid">
          Введите пароль
        </small>
        <small v-else-if="$v.password.$dirty && !$v.password.minLength"
               class="helper-text invalid">
          Минимальная длина пароля - {{ $v.password.$params.minLength.min }} символов
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit"
                type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/registration">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { required, email, minLength } from 'vuelidate/lib/validators';
  import messages from '@/utils/messages.js';

  export default {
    name: 'Login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    mixins: [validationMixin],
    methods: {
      async submit() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }

        const formData = {
          email: this.email,
          password: this.password
        };

        try {
          await this.$store.dispatch('login', formData);
          await this.$router.push('/');
        } catch (e) {}
      }
    },
    validations: {
      email: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(6)
      }
    },
    mounted() {
      const message = messages[this.$route.query.message];

      if (message) {
        this.$message(message);
      }
    }
  }
</script>
