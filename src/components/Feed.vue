<template>
  <div class='tw-feed-container'>
    <div v-if='isLoading' class='tw-feed-loading'>Загрузка...</div>
    <div v-if='error' class='tw-feed-error'>Ошибка...</div>
    <div v-if='feed' class='tw-feed-list'>
      <div v-for='(article, index) in feed.data' :key='index' class='tw-feed-item'>
        <h3 class='tw-feed-item-title'>{{ article.name }}</h3>
        <div class='tw-feed-item-description'>{{ article.description }}</div>
        <p class='tw-feed-item-price'>{{ article.price }} <span>шейкелей</span></p>
        <MyButton v-if='isLoggedIn' @click='addToCart(article)'>Добавить в корзину</MyButton>
      </div>
    </div>
  </div>
</template>

<script>
import getFeed from '@/store/modules/feed'
import {mapState} from 'vuex'
import MyButton from '@/components/UI/MyButton'

export default {
  components: {
    MyButton
  },
  name: 'TwFeed',
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error,
      isLoggedIn: state => state.auth.isLoggedIn
    })
  },
  methods: {
    addToCart(article) {
      // Добавить товар в корзину
    }
  },
  mounted() {
    this.$store.dispatch('getFeed', {apiUrl: this.apiUrl})
  }
}
</script>

<style scoped>
.tw-feed-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tw-feed-loading,
.tw-feed-error {
  margin: 20px 0;
}

.tw-feed-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.tw-feed-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.tw-feed-item-title {
  margin-top: 0;
  margin-bottom: 10px;
}

.tw-feed-item-description {
  margin: 0;
  margin-bottom: 10px;
}

.tw-feed-item-price {
  margin: 0;
  font-weight: bold;
}
</style>
