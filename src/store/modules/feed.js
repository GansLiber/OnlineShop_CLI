import feedApi from '@/api/feed'
import addYourFeed from '@/api/yourFeed'
import delYourFeed from '@/api/yourFeed'
import orderYourFeed from '@/api/yourFeed'
import axios from 'axios'
import currentUser from '@/store/modules/auth'

const state = {
  data: null,
  isLoading: false,
  error: null
}

const mutations = {
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

  getYourFeedStart(state) {
    state.isLoading = true
  },
  getYourFeedSuccess(state) {
    state.isLoading = false
  },
  getYourFeedFailure(state) {
    state.isLoading = false
  },

  delYourFeedStart(state) {
    state.isLoading = true
  },
  delYourFeedSuccess(state) {
    state.isLoading = false
  },
  delYourFeedFailure(state) {
    state.isLoading = false
  },

  orderYourFeedStart(state) {
    state.isLoading = true
  },
  orderYourFeedSuccess(state) {
    state.isLoading = false
  },
  orderYourFeedFailure(state) {
    state.isLoading = false
  }

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
  getYourFeed(context, {apiUrl}) {
    return new Promise(resolve => {
      context.commit('getYourFeedStart')
      const token = currentUser.state.currentUser.token
      axios.defaults.headers.common.Authorization = `Bearer ${token}`


      addYourFeed.addYourFeed(apiUrl).then(gg => {
        context.commit('getYourFeedSuccess')
        resolve(gg)
      })
        .catch(() => {
          context.commit('getYourFeedFailure')
        })
    })
  },
  delYourFeed(context, {apiUrl, delId}) {
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