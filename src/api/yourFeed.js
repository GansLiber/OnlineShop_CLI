import axios from '@/api/axios'

const addYourFeed = apiAddFeed => {
  return axios.post(apiAddFeed)
}

const delYourFeed = apiDelFeed => {
  return axios.delete(apiDelFeed)
}

const orderYourFeed = orderYourFeed => {
  return axios.post(orderYourFeed)
}

export default {
  addYourFeed,
  delYourFeed,
  orderYourFeed
}