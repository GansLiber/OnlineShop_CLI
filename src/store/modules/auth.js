import authApi from '@/api/auth'
import index from 'vuex'
import {setItem} from '@/helpers/persistanceStorage'
import login from '@/views/Login'
import validationErrors from '@/components/ValidationErrors'

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
    console.log('loginFailure', state.validationErrors)
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
          console.log('gg ', result.response.data.error.errors)
          context.commit('registerFailure', result.response.data.error.errors)
        })
    })
  },
  login(context, credentials) {
    context.commit('loginStart')
    return new Promise(resolve => {
      authApi.login(credentials).then(response => {
        context.commit('loginSuccess', credentials)
        console.log('ono', credentials)
        resolve(response)
      })
        .catch(result => {
          if (result.response.data.error.code === 401) {
            context.commit('loginFailure', {gg: ['Почта или пароль написаны не верно']})
          } else {
            context.commit('loginFailure', result.response.data.error.errors)
          }
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}