import axios from '@/api/axios'

const getYourFeed = apiYourFeed => {
  return axios.post('/cart', apiYourFeed)
}

export default {
  getYourFeed
}