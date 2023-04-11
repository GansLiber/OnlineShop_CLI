import feedApi from '@/api/feed'
import addYourFeed from '@/api/yourFeed'
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
      console.log('eeee', context, apiUrl)
      axios.defaults.headers.common.Authorization = `Bearer ${token}`


      addYourFeed.addYourFeed(apiUrl).then(gg => {
        context.commit('getYourFeedSuccess')
        console.log('L', gg)
        resolve(gg)
      })
        .catch(() => {
          context.commit('getYourFeedFailure')
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}