import axios from 'axios'
import {getItem} from '@/helpers/persistanceStorage'

axios.defaults.baseURL = 'https://jurapro.bhuser.ru/api-shop'

axios.interceptors.request.use(config => {
  const token = getItem('accessToken')
  const authorizationToken = token ? `Token ${token}` : ''
  console.log('token: ', authorizationToken)
  return config
})
export default axios