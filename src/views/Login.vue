<template class='main'>
  <div class='main'>
    <div>
      <TwValidationErrors v-if='validationErrors' :validation-errors='validationErrors' />
      <form @submit.prevent='onSubmit'>
        <label for='name'>Ник</label>
        <input v-model='fio' type='text' name='name' id='name'>
        <label for='password'>Пароль</label>
        <input v-model='password' type='password' name='password' id='password'>
        <input type='submit' class='btn' value='Зарегистрироваться'>
      </form>
      <p>
        <router-link to='/register'>Хотите зарегистрироваться?</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import TwValidationErrors from '@/components/ValidationErrors'

export default {
  name: 'TwLogin',
  components: {
    TwValidationErrors
  },
  data() {
    return {
      email: '',
      password: '',
      fio: ''
    }
  },
  methods: {},
  computed: {}
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