import axios from 'axios'
console.log(
  'process.env.REACT_APP_BACKEND_API',
  process.env.REACT_APP_BACKEND_API
)
const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_API,
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['x-access-token'] = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  (res) => {
    return res
  },
  async (err) => {
    const originalRequest = err.config
    const refreshToken = localStorage.getItem('refresh_token')
    if (
      err.response &&
      err.response.status === 401 &&
      err.config &&
      !err.config.__isRetryRequest &&
      refreshToken
    ) {
      originalRequest._retry = true
      try {
        const response = await instance.post('/auth/refreshtoken', {
          refreshToken
        })

        const { accessToken } = response.data
        localStorage.setItem(accessToken, 'token')
        return instance(originalRequest)
      } catch (error) {
        return Promise.reject(error)
      }
    }

    return Promise.reject(err)
  }
)

export default instance
