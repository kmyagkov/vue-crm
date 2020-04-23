<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email"
               type="text"
               v-model="email"
               :class="{'invalid': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid"
               v-if="$v.email.$dirty && !$v.email.required"
        >
          Введите email
        </small>
        <small class="helper-text invalid"
               v-else-if="$v.email.$dirty && !$v.email.email"
        >
          Введите корректный e-mail
        </small>
      </div>
      <div class="input-field">
        <input id="password"
               type="password"
               v-model="password"
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
      <div class="input-field">
        <input id="name"
               type="text"
               v-model.trim="name"
               :class="{'invalid': $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">Имя</label>
        <small class="helper-text invalid"
               v-if="$v.name.$dirty && !$v.name.required"
        >
          Введите ваше имя
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox"
                 v-model="isAgree"
          />
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit"
                type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти</router-link>
      </p>
    </div>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { required, email, minLength } from 'vuelidate/lib/validators';

  export default {
    name: 'Registration',
    data() {
      return {
        email: '',
        password: '',
        name: '',
        isAgree: false
      }
    },
    mixins: [validationMixin],
    methods: {
      async submitHandler() {
        if (this.$v.$invalid) {
          this.$v.$touch();
          return;
        }

        const formData = {
          email: this.email,
          password: this.password,
          name: this.name
        };

        try {
          await this.$store.dispatch('register', formData);
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
      },
      name: {
        required
      },
      isAgree: {
        checked: value => value
      }
    }
  }
</script>
