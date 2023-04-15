import axios from '@/api/axios'

const getFeed = apiUrl => {
  return axios.get(apiUrl)
}

// let arr = []
// let obj = {
//   gg: 'alo',
//   wp: 'gabes'
// }
// arr.push(obj.gg)

export default {
  getFeed
}

