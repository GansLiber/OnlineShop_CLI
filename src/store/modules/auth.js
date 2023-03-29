import authApi from '@/api/auth'

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
  }
}

const actions = {
  register(context, credentials) {
    context.commit('registerStart')
    return new Promise(resolve => {
      authApi.register(credentials).then(response => {
        // console.log(response.data) //токен пользователя
        context.commit('registerSuccess', credentials)
        resolve(response)
      })
        .catch(result => {
          console.log(result.response.data.error.errors)
          context.commit('registerFailure', result.response.data.error.errors)
        })
    })

    // setTimeout(() => {
    //     context.commit('registerStart')
    // }, 1000)
  }
}

export default {
  state,
  mutations,
  actions
}