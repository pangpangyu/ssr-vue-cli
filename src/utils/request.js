import axios from 'axios'

const request = axios.create({})

request.defaults.baseURL = 'https://v1.hitokoto.cn'
request.defaults.timeout = 60000
request.defaults.withCredentials = false

request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export default request
