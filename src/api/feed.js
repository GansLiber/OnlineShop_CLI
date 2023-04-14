import axios from '@/api/axios'

const getFeed = apiUrl => {
  return axios.get(apiUrl)
}

let arr = [
  {
    id: 1,
    name: 'ggwp'
  },
  {
    id: 2,
    name: 'tyjtyj'
  },
  {
    id: 1,
    name: 'ggwp'
  },
  {
    id: 4,
    name: 'trkrtuyk'
  },
  {
    id: 1,
    name: 'ggwp'
  },
  {
    id: 3,
    name: 'trkrt'
  }
]

export default {
  getFeed
}

