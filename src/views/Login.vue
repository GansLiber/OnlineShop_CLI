<template class='main'>
  <div class='main'>
    <div class='login-container'>
      <h2>Авторизация</h2>
      <TwValidationErrors v-if='validationErrors' :validation-errors='validationErrors' />
      <form @submit.prevent='onSubmit' class='login-form'>
        <div class='form-input-group'>
          <label for='email'>Почта</label>
          <input v-model='email' type='email' name='email' id='email' class='input-field'>
        </div>
        <div class='form-input-group'>
          <label for='password'>Пароль</label>
          <input v-model='password' type='password' name='password' id='password' class='input-field'>
        </div>
        <MyButton :disabled='isSubmitting' type='submit'>Войти</MyButton>
      </form>
      <div class='register-link'>
        <router-link to='/register'>Хотите зарегистрироваться?</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import TwValidationErrors from '@/components/ValidationErrors'
import MyButton from '@/components/UI/MyButton'

export default {
  name: 'TwLogin',
  components: {
    MyButton,
    TwValidationErrors
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      this.$store.commit('loginStart')
      this.$store.dispatch('login', {
        email: this.email,
        password: this.password
      })
        .then(credentials => {
          this.$router.push({name: 'globFeed'})
          this.$store.dispatch('loginAgain')
        })
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

h2 {
  position: relative;
  margin-right: 38px;
  margin-bottom: 20px;
  margin-top: 100px;
}

.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #F5F5F5;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
}

.form-input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.form-input-group > label {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.input-field {
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #FAFAFA;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
}

.register-link {
  margin-right: 10px;
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
  display: flex;
  justify-content: center;
}
</style>