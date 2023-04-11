import axios from '@/api/axios'

const addYourFeed = apiAddFeed => {
  return axios.post(apiAddFeed)
}

export default {
  addYourFeed
}