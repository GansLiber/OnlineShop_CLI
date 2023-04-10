<template>
  <div class='tw-feed-container'>
    <div v-if='isLoading' class='tw-feed-loading'>Загрузка...</div>
    <div v-if='error' class='tw-feed-error'>Ошибка...</div>
    <div v-if='feed' class='tw-feed-list-container'>
      <div class='tw-feed-list'>
        <div v-for='(article, index) in paginatedItems' :key='index' class='tw-feed-item'>
          <h3 class='tw-feed-item-title'>{{ article.name }}</h3>
          <div class='tw-feed-item-description'>{{ article.description }}</div>
          <p class='tw-feed-item-price'>{{ article.price }} <span>шейкелей</span></p>
          <MyButton v-if='isLoggedIn' @click='addToCart(article)'>Добавить в корзину</MyButton>
        </div>
      </div>
      <TwPagination
        :items='feed.data'
        :per-page='9'
        @page-changed='handlePageChanged'
      ></TwPagination>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import MyButton from '@/components/UI/MyButton'
import TwPagination from '@/components/Pagination'
import {limit} from '@/helpers/vars'
import qs from 'query-string'

const {parse: parseUrl, stringify} = qs

export default {
  components: {
    MyButton,
    TwPagination
  },
  name: 'TwFeed',
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      limit,
      url: null,
      paginatedItems: []
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
    },
    fetchFeed() {
      console.log('pp', this.apiUrl)
      this.$store.dispatch('getFeed', {apiUrl: this.apiUrl})
    },
    handlePageChanged(paginatedItems) {
      this.paginatedItems = paginatedItems
    }
  },
  mounted() {
    this.fetchFeed()
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

.tw-feed-list-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tw-feed-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 80em;
  flex: 1;
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