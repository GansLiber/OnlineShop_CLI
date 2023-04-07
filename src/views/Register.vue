<template class='main'>
  <div class='main'>
    <div>
      <h2>Регистрация</h2>
      <TwValidationErrors v-if='validationErrors' :validation-errors='validationErrors' />
      <form @submit.prevent='onSubmit'>
        <label for='name'>Ник</label>
        <input v-model='fio' type='text' name='name' id='name'>
        <label for='password'>Пароль</label>
        <input v-model='password' type='password' name='password' id='password'>
        <label for='email'>Почта</label>
        <input v-model='email' type='email' name='email' id='email'>
        <input :disabled='isSubmitting' type='submit' class='btn' value='Зарегистрироваться'>
      </form>
      <p>
        <router-link to='/login'>Уже есть аккаунт?</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import TwValidationErrors from '@/components/ValidationErrors'

export default {
  name: 'TwRegister',
  components: {
    TwValidationErrors
  },
  data() {
    return {
      email: '',
      password: '',
      fio: '',
      token: ''
    }
  },
  methods: {
    onSubmit() {
      this.$store.commit('registerStart')
      this.$store.dispatch('register', {
        fio: this.fio,
        email: this.email,
        password: this.password
      })
        .then(credentials => {
          console.log('успешно зарегестрированный пользователь', credentials)
          this.$router.push({name: 'globFeed'})
        })
      // получается вызов мутации из локального модуля стейта запускает процесс изменения свойства, которое возвращается вычисляемым свойством, которое берет его опять же из локального стейта(по совместительству модуля) и меняет его
    }
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors
    }
  }
}
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  height: 100%;
}

form {
  display: inline-block;
}

form > input, label {
  display: grid;
  margin: 5px;
  padding: 3px;
}

.btn {
  margin-top: 14px;
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  vertical-align: middle;
  text-decoration: none;
  font-family: inherit;
  color: #673817;
  text-transform: uppercase;
  padding: 0.25em 0.55em;
  background: #fff0f0;
  border: 1px solid #b18597;
  transition: transform 0.15s;
  transform-style: preserve-3d;
}

.btn:hover {
  color: #0c1f1f;
  background: #eae0e0 1px;
}
</style>