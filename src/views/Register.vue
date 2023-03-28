<template class="main">
  <div class="main">
    <div>
      <p>Ошибки</p>
      <form @submit.prevent="onSubmit">
        <label for="name">Ник</label>
        <input type="text" name="name" id="name">
        <label for="password">Пароль</label>
        <input type="password" name="password" id="password">
        <label for="email">Почта</label>
        <input type="email" name="email" id="email">
        <input type="submit" class="btn" value="Зарегистрироваться">
      </form>
      <p>
        <router-link to="{name:login}">Уже есть аккаунт?</router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "TwRegister",
  methods: {
    onSubmit() {
      this.$store.commit('registerStart')
      this.$store.dispatch('register')
      // получается вызов мутации из локального модуля стейта запускает процесс изменения свойства, которое возвращается вычисляемым свойством, которое берет его опять же из локального стейта(по совместительству модуля) и меняет его
    }
  },
  computed: {
    issSubmitting() {
      return this.$store.state.auth.isSubmitting
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