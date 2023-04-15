<template>
  <div class='tw-feed-container'>
    <TwLoader v-if='isLoading' class='tw-feed-loading'></TwLoader>
    <TwErrorMessage v-if='error'></TwErrorMessage>
    <my-button
      v-if='isLoggedIn && typePar==="myFeed" && paginatedItems.length>0 && feed'
      class='orderBtn'
      @click='getOrder(paginatedItems)'
    >Заказать
    </my-button>
    <div v-if='paginatedItems.length<1'><h2>Вы еще ничго не добавили в корзину</h2></div>
    <div v-if='feed' class='tw-feed-list-container'>
      <div class='tw-feed-list'>
        <div
          v-for='(article, index) in paginatedItems'
          :key='index'
          class='tw-feed-item'
        >
          <div v-if='apiUrl!=="order"'>
            <div
              v-if='isLoggedIn && typePar==="myFeed" && feed'
              class='close-button'
              @click='delAll(article)'
            >
              <span></span>
              <span></span>
            </div>

            <h3 class='tw-feed-item-title'>{{ article.name }}</h3>
            <div class='tw-feed-item-description'>{{ article.description }}</div>
            <div v-if='isLoggedIn && typePar==="order"' class='orderStaff'>
              <h1>Заказано</h1>
              <ul>Заказаны товары c id:
                <li v-for='order in article.products'>{{ order }}</li>
              </ul>
            </div>
            <p class='tw-feed-item-price'>{{ article.price }}{{ article.order_price }}<span v-if='typePar==="order"'> всего </span>
              <span> шейкелей</span></p>
            <MyButton
              v-if='isLoggedIn && typePar==="globFeed"'
              @click='addToCart(article, index)'>Добавить в корзину
            </MyButton>
            <div v-if='isLoggedIn && typePar==="myFeed"' class='more-sess'>
              <MyButton
                @click='addToCartBasket(article, index)'>+
              </MyButton>
              <MyButton
                @click='delFeed(article)'>-
              </MyButton>
              <span>Количество: {{ article.count }}</span>
            </div>
          </div>
        </div>
      </div>
      <TwPagination
        v-if='paginatedItems && isLoadedFeed'
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
      paginatedItems: [],
      isLoadedFeed: false
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      delFeedData: state => state.feed.delData,
      error: state => state.feed.error,
      isLoggedIn: state => state.auth.isLoggedIn
    })

  },
  methods: {
    addToCart(article) {
      this.$store.dispatch('addYourFeed', {apiUrl: `/cart/${article.id}`})
    },
    addToCartBasket(article) {
      this.$store.dispatch('addYourFeed', {apiUrl: `/cart/${article.product_id}`})
      article.count++
    },
    fetchFeed() {
      this.$store.dispatch('getFeed', {apiUrl: this.apiUrl})
      this.isLoadedFeed = true
    },


    fetchYourFeed() {
      this.$store.dispatch('getYourFeed', {apiUrl: this.apiUrl})
        .then(() => {
          this.stackYourFeed()
          this.isLoadedFeed = true
        })
    },
    stackYourFeed() {
      console.log('feed', this.feed.data)
      this.$store.dispatch('stackYourFeed', this.feed)
      // console.log('feed', this.feed.data)
    },


    handlePageChanged(paginatedItems) {
      this.paginatedItems = paginatedItems
      console.log('paginatedItems', paginatedItems)
    },
    delFeed(article) {
      // console.log('gg', this.delFeedData)
      // console.log('wp', this.feed)
      // console.log('art', article)
      for (let deleted of this.delFeedData.data) {
        if (deleted.product_id === article.product_id) {
          this.$store.dispatch('delYourFeed', {
            apiUrl: `/cart/${deleted.id}`
          }).then(() => {
            article.count--
            for (let deleted of this.delFeedData.data) {
              if (deleted.product_id === article.product_id) {
                this.delFeedData.data.splice(this.delFeedData.data.indexOf(deleted), 1)
                break
              }
            }
            if (article.count === 0) {
              this.clearInterface(article)
            }
          })
          break
        }
      }
    },
    delAll(article) {
      for (let deleted of this.delFeedData.data) {
        if (deleted.product_id === article.product_id) {
          console.log('wp', article.id)
          this.$store.dispatch('delYourFeed', {
            apiUrl: `/cart/${deleted.id}`
          }).then(() => {
            this.clearInterface(article)
          })
        }
      }
    },
    clearInterface(article) {
      this.paginatedItems = this.paginatedItems.filter(item => item.id !== article.id)
      this.feed.data = this.feed.data.filter(item => item.id !== article.id)
      // this.delFeedData.delData.data = this.delFeedData.delData.data.filter(item => item.id !== article.id)
    },
    getOrder() {
      this.$store.dispatch('orderYourFeed', {apiUrl: `/order`})
    }
  },
  mounted() {
    if (this.typePar === 'myFeed') {
      this.fetchYourFeed()
    } else {
      this.fetchFeed()
    }
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

.orderBtn {
  font-size: 30px;
}

.orderStaff {
  position: relative;
  margin-bottom: 90px;
}

.gg {
  margin-right: 10px;
  background-color: #b40a0a;
  border-radius: 100px;
  height: 20px;
}
</style>