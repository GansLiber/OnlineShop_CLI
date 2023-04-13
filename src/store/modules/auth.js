import authApi from '@/api/auth'
import {getItem, setItem} from '@/helpers/persistanceStorage'

const state = {
  isLoading: false,
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
  },

  loginAgainStart(state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  loginAgainSuccess(state, payload) {
    state.isSubmitting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  loginAgainFailure(state) {
    state.isSubmitting = false
  },

  loginExitStart(state) {
    state.currentUser = null
    state.isLoading = true
    state.isLoggedIn = false
    localStorage.clear()
  },
  loginExitSuccess(state) {
    state.currentUser = null
    state.isLoading = false
    state.isLoggedIn = false

  }
}

const actions = {
  register(context, credentials) {
    console.log('credentials', credentials)
    context.commit('registerStart')
    return new Promise(resolve => {
      authApi.register(credentials).then(response => {
        credentials.token = response.data.data.user_token
        context.commit('registerSuccess', credentials)
        setItem('accessToken', response.data.data.user_token)
        setItem('fio', credentials.fio)
        setItem('email', credentials.email)
        setItem('password', credentials.password)
        console.log('swapppsss', this.state.currentUser)
        resolve(response)
      })
        .catch(result => {
          context.commit('registerFailure', result.response.data.error.errors)
        })
    })
  },
  login(context, credentials) {
    context.commit('loginStart')
    return new Promise(resolve => {
      authApi.login(credentials).then(response => {
        context.commit('loginSuccess', credentials)
        setItem('accessToken', response.data.data.user_token)
        setItem('fio', credentials.fio)
        setItem('email', credentials.email)
        setItem('password', credentials.password)
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
  },
  // loginAgain(context) {
  //   context.commit('loginAgainStart')
  //   const email = getItem('email')//const ли?
  //   const password = getItem('password')
  //   const fio = getItem('fio')
  //   let credentials = {email: email, password: password}
  //   console.log('emailTypo', credentials)
  //   return new Promise(resolve => {
  //     authApi.login(credentials).then(response => {
  //       console.log('resp', response)
  //       context.commit('loginAgainSuccess', credentials)
  //       this.state.currentUser = {email: email, password: password, fio: fio, token: response.data.data.user_token}
  //       console.log('swappp', this.state.currentUser)
  //       setItem('accessToken', response.data.data.user_token)
  //       resolve(response)
  //     })
  //       .catch(result => {
  //         if (result.response.data.error.code === 401) {
  //           context.commit('loginAgainFailure', {gg: ['Почта или пароль написаны не верно']})
  //         } else {
  //           context.commit('loginAgainFailure', result.response.data.error.errors)
  //         }
  //       })
  //   })
  // },
  loginAgain(context) {
    context.commit('loginAgainStart')
    const email = getItem('email')//const ли?
    const password = getItem('password')
    const fio = getItem('fio')
    const token = getItem('accessToken')
    if (email && password && token) {
      const payload = {email: email, password: password, fio: fio, token: token}
      context.commit('loginAgainSuccess', payload)
    } else {
      context.commit('loginAgainFailure')
    }

    console.log('ooo', state.currentUser)

    // let credentials = {email: email, password: password}
    // console.log('emailTypo', credentials)
    // return new Promise(resolve => {
    //   authApi.login(credentials).then(response => {
    //     console.log('resp', response)
    //     context.commit('loginAgainSuccess', credentials)
    //     this.state.currentUser = {email: email, password: password, fio: fio, token: response.data.data.user_token}
    //     console.log('swappp', this.state.currentUser)
    //     setItem('accessToken', response.data.data.user_token)
    //     resolve(response)
    //   })
    //     .catch(result => {
    //       if (result.response.data.error.code === 401) {
    //         context.commit('loginAgainFailure', {gg: ['Почта или пароль написаны не верно']})
    //       } else {
    //         context.commit('loginAgainFailure', result.response.data.error.errors)
    //       }
    //     })
    // })
  },
  loginOut(context) {
    context.commit('loginExitStart')
    authApi.logout().then(() => {
      localStorage.clear()
      context.commit('loginExitSuccess')
    })
  }
}

export default {
  state,
  mutations,
  actions
}