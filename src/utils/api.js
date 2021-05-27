import request from './request'

const api = {
  getTest () {
    return request.get('/')
  }
}

export default api
