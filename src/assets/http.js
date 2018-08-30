import axios from 'axios'
import qs from 'qs'

export const http = axios.create({
  baseURL: 'http://127.0.0.1:8081',
  timeout: 2000,
  transformRequest: [(data) => {
    return qs.stringify(data)
  }],
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})
