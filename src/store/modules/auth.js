import authApi from '@/api/auth'
import index from 'vuex'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmitting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
}

const mutations = {
  registerStart(state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  registerSuccess(state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  registerFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  },
  loginStart(state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  loginSuccess(state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  loginFailure(state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

const actions = {
  register(context, credentials) {
    context.commit('registerStart')
    return new Promise(resolve => {
      authApi.register(credentials).then(response => {
        // console.log(response.data.data.user_token) //токен пользователя
        context.commit('registerSuccess', credentials)
        setItem('accessToken', response.data.data.user_token)
        resolve(response)
      })
        .catch(result => {
          console.log(result.response.data.error.errors)
          context.commit('registerFailure', result.response.data.error.errors)
        })
    })
  },
  login(context, credentials) {
    context.commit('loginStart')
    return new Promise(resolve => {
      context.commit('loginSuccess', credentials)
      // !!!
    })
  }
}

export default {
  state,
  mutations,
  actions
}