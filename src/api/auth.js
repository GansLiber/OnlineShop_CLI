import axios from '@/api/axios'

const register = credentials => {
  return axios.post('/signup', credentials)
}

const login = credentials => {
  return axios.post('/login', credentials)
}

const getCurrentUser = () => {
  return axios.get('/user')
}
export default {
  register,
  login,
  getCurrentUser
}