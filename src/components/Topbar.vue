<template>
  <nav>
    <div>
      <router-link to='/' class='logo'>Просто купить</router-link>
    </div>
    <div class='menu'>
      <ul v-if='isLoggedIn'>
        <p class='userName'>Пользователь: {{ currentUser.fio }}</p>
        <router-link to='/catalog'>Каталог товаров</router-link>
        <router-link to='/basket'>Корзина</router-link>
        <router-link to='/order'>Оформленные заказы</router-link>
        <router-link to='/exit'>Выход</router-link>
      </ul>
      <ul v-if='!isLoggedIn'>
        <router-link to='/login' active-class='active'>Авторизация</router-link>
        <router-link to='/register'>Регистрация</router-link>
      </ul>
    </div>
  </nav>
  <!--  <div>{{ currentUser }}цз{{ isLoggedIn }}</div>-->
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'TwTopbar',
  data() {
    return {}
  },
  methods: {
    loginExit() {
      return this.$store.state.auth.loginExit
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.auth.currentUser,
      isLoggedIn: state => state.auth.isLoggedIn
    })
  }
}
</script>


<style scoped>
nav {
  height: 6em;
  display: flex;
  justify-content: space-evenly;
  background-color: #ffe6dd;
}

nav > div {
  display: flex;
  align-items: center;
}

nav > div:first-child {
  justify-content: flex-start;
}

.userName {
  font-size: 1.3em;
  left: 12.8em;
  position: relative;
}

a {
  margin-right: 15px;
  text-decoration: none;
  color: #98430b;
  font-size: 1.3em;
}

a:hover {
  color: #1a1204;
}

.logo {
  text-decoration: none;
  font-size: 2em;
  color: #44220a;
}
</style>