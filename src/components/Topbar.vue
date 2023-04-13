<template>
  <nav>
    <div>
      <router-link to='globFeed' class='logo'>Просто купить</router-link>
    </div>
    <div class='menu'>
      <ul v-if='isLoggedIn'>
        <p class='userName'>Пользователь: {{ currentUser.fio }}</p>
        <router-link to='/globFeed'>Каталог товаров</router-link>
        <router-link to='/yourFeed'>Корзина</router-link>
        <router-link to='/ordered'>Оформленные заказы</router-link>
        <a @click='loginExit'>Выход</a>
      </ul>
      <ul v-if='!isLoggedIn'>
        <router-link to='/login'>Авторизация</router-link>
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
      this.$store.dispatch('loginOut')
      this.$router.push({name: 'login'})
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.auth.currentUser,
      isLoggedIn: state => state.auth.isLoggedIn
    })
  },
  mounted() {
    console.log('topbar', this.currentUser)
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
  cursor: default;
}

.logo {
  text-decoration: none;
  font-size: 2em;
  color: #44220a;
}
</style>