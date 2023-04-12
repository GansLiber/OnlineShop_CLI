import axios from '@/api/axios'

const addYourFeed = apiAddFeed => {
  return axios.post(apiAddFeed)
}

const delYourFeed = apiDelFeed => {
  return axios.delete(apiDelFeed)
}

export default {
  addYourFeed,
  delYourFeed
}