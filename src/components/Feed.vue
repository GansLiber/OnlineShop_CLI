<template>
  <div class='tw-feed-container'>
    <div v-if='isLoading' class='tw-feed-loading'>Загрузка...</div>
    <div v-if='error' class='tw-feed-error'>Ошибка...</div>
    <div v-if='feed' class='tw-feed-list-container'>
      <div class='tw-feed-list'>
        <div v-for='(article, index) in feed.data' :key='index' class='tw-feed-item'>
          <h3 class='tw-feed-item-title'>{{ article.name }}</h3>
          <div class='tw-feed-item-description'>{{ article.description }}</div>
          <p class='tw-feed-item-price'>{{ article.price }} <span>шейкелей</span></p>
          <MyButton v-if='isLoggedIn' @click='addToCart(article)'>Добавить в корзину</MyButton>
        </div>
      </div>
      <TwPagination
        :total='feed.data.length'
        :limit='limit'
        :currentPage='currentPage'
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
      url: null
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error,
      isLoggedIn: state => state.auth.isLoggedIn
    }),
    currentPage() {
      console.log(this.$route)
      return Number(this.$route.query.page || '1')
    },
    offset() {
      return this.currentPage * limit - limit
    }
  },
  methods: {
    addToCart(article) {
      // Добавить товар в корзину
    },
    fetchFeed() {
      const PerParsedUrl = this.apiUrl
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...PerParsedUrl.query
      })
      const apiUrlParams = `${PerParsedUrl}?${stringifiedParams}`
      console.log('pp', this.apiUrl)
      this.$store.dispatch('getFeed', {apiUrl: apiUrlParams})
    }
  },
  watch: {
    currentPage() {
      console.log(this.currentPage, 'changed')
      this.fetchFeed()
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