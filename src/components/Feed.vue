<template>
  <div class='tw-feed-container'>
    <TwLoader v-if='isLoading' class='tw-feed-loading'></TwLoader>
    <TwErrorMessage v-if='error'></TwErrorMessage>
    <div v-if='feed' class='tw-feed-list-container'>
      <div class='tw-feed-list'>
        <div v-for='(article, index) in paginatedItems' :key='index' class='tw-feed-item'>
          <div v-if='isLoggedIn && typePar==="myFeed"' class='close-button'>
            <span></span>
            <span></span>
          </div>

          <h3 class='tw-feed-item-title'>{{ article.name }}</h3>
          <div class='tw-feed-item-description'>{{ article.description }}</div>
          <p class='tw-feed-item-price'>{{ article.price }} <span>шейкелей</span></p>
          <MyButton
            v-if='isLoggedIn && typePar==="globFeed"'
            @click='addToCart(article, index)'>Добавить в корзину
          </MyButton>
          <div v-if='isLoggedIn && typePar==="myFeed"' class='more-sess'>
            <MyButton
              @click='addToCart(article, index)'>+
            </MyButton>
            <MyButton
              @click='addToCart(article, index)'>-
            </MyButton>
          </div>
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
import TwLoader from '@/components/UI/Loader'
import TwErrorMessage from '@/components/ErrorMessage'


export default {
  components: {
    MyButton,
    TwPagination,
    TwLoader,
    TwErrorMessage
  },
  name: 'TwFeed',
  props: {
    apiUrl: {
      type: String,
      required: true
    },
    typePar: {
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
    addToCart(article, index) {
      console.log('bb', article, index)
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
  height: 80px;
  overflow: hidden;
  margin: 0;
  margin-bottom: 10px;
}

.tw-feed-item-price {
  margin: 0;
  font-weight: bold;
}

.more-sess > * {
  margin-left: 5px;
  margin-right: 5px;
}

.close-button {
  width: 20px;
  height: 20px;
  position: relative;
  cursor: pointer;
  margin-right: 0px;
}

.close-button span {
  position: absolute;
  height: 2px;
  width: 100%;
  top: 50%;
  left: 0;
  margin-top: -1px;
  background-color: #000;
}

.close-button span:first-child {
  transform: rotate(45deg);
}

.close-button span:last-child {
  transform: rotate(-45deg);
}


.gg {
  margin-right: 10px;
  background-color: #b40a0a;
  border-radius: 100px;
  height: 20px;
}
</style>