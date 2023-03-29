import axios from '@/api/axios'

const register = credentials => {
  return axios.post('/signup', credentials)
}

export default {
  register
}