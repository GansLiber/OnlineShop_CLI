import feedApi from '@/api/feed'
import addYourFeed from '@/api/yourFeed'
import delYourFeed from '@/api/yourFeed'
import orderYourFeed from '@/api/yourFeed'
import axios from 'axios'
import currentUser from '@/store/modules/auth'

const state = {
  data: null,
  delData: null,
  isLoading: false,
  error: null
}

const mutations = {//тут тоже мутации общие у двух функций важных - ошибка
  getFeedStart(state) {
    state.isLoading = true
    state.data = null
  },
  getFeedSuccess(state, payload) {
    state.isLoading = false
    state.data = payload
  },
  getFeedFailure(state) {
    state.isLoading = false
  },
// !!!
  getYourFeedStart(state) {
    state.isLoading = true
    state.data = null
    state.delData = null
  },
  getYourFeedSuccess(state, payload) {
    state.isLoading = false
    state.data = payload
    state.delData = {...payload}
  },
  getYourFeedFailure(state) {
    state.isLoading = false
  },
// !!!
  stackYourFeedStart(state) {
    state.isLoading = true
    state.data = null
  },
  stackYourFeedSuccess(state) {
    state.isLoading = false
  },
// !!!
  addYourFeedStart(state) {
    state.isLoading = true
  },
  addYourFeedSuccess(state) {
    state.isLoading = false
  },
  addYourFeedFailure(state) {
    state.isLoading = false
  },
// !!!
  delYourFeedStart(state) {
    state.isLoading = true
  },
  delYourFeedSuccess(state) {
    state.isLoading = false
  },
  delYourFeedFailure(state) {
    state.isLoading = false
  },
// !!!
  orderYourFeedStart(state) {
    state.isLoading = true
  },
  orderYourFeedSuccess(state) {
    state.isLoading = false
    state.data = null
  },
  orderYourFeedFailure(state) {
    state.isLoading = false
  }
// !!!
}

const actions = {
  getFeed(context, {apiUrl}) {
    return new Promise(resolve => {
      context.commit('getFeedStart')
      const token = currentUser.state.currentUser.token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`

      feedApi.getFeed(apiUrl).then(response => {
        context.commit('getFeedSuccess', response.data)
        resolve(response.data)
      })
        .catch(() => {
          context.commit('getFeedFailure')
        })
    })
  },
  //это обработчик карзины, такой же как на главной
  getYourFeed(context, {apiUrl}) {
    return new Promise(resolve => {
      context.commit('getYourFeedStart')
      const token = currentUser.state.currentUser.token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`

      feedApi.getFeed(apiUrl).then(response => {
        console.log('data22', context)
        context.commit('getYourFeedSuccess', response.data)
        console.log('dataAfter', response.data)
        resolve(response.data)
      })
        .catch(() => {
          context.commit('getYourFeedFailure')
        })
    })
  },
  stackYourFeed(context) {
    console.log('arryf', state.data)
    // context.commit('stackYourFeedStart')
    state.data.data = state.data.data.reduce((acc, obj) => {
      let found = acc.find(item => item.product_id === obj.product_id)
      if (found) {
        found.count++
      } else {
        acc.push({id: obj.id, product_id: obj.product_id, name: obj.name, description: obj.description, count: 1})
      }
      return acc
    }, [])
    // context.commit('stackYourFeedSuccess')
    console.log('resultStacked', state.data.data)
  },

  addYourFeed(context, {apiUrl}) {
    return new Promise(resolve => {
      context.commit('addYourFeedStart')
      const token = currentUser.state.currentUser.token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`

      addYourFeed.addYourFeed(apiUrl).then(gg => {
        context.commit('addYourFeedSuccess')
        resolve(gg)
      })
        .catch(() => {
          context.commit('addYourFeedFailure')
        })
    })
  },
  delYourFeed(context, {apiUrl}) {
    return new Promise(resolve => {
      context.commit('delYourFeedStart')
      const token = currentUser.state.currentUser.token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`

      delYourFeed.delYourFeed(apiUrl).then(gg => {
        context.commit('delYourFeedSuccess')
        resolve(gg)
      })
        .catch(() => {
          context.commit('delYourFeedFailure')
        })
    })
  },
  orderYourFeed(context, {apiUrl}) {
    return new Promise(resolve => {
      context.commit('orderYourFeedStart')

      const token = currentUser.state.currentUser.token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`

      orderYourFeed.orderYourFeed(apiUrl).then(gg => {
        context.commit('orderYourFeedSuccess')
        resolve(gg)
      })
        .catch(() => {
          context.commit('orderYourFeedFailure')
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}