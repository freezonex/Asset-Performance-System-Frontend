import axios from 'axios'

axios.defaults.timeout = 10000

axios.defaults.baseURL = process.env.apiUrl

// 请求拦截器
axios.interceptors.request.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
//HTTPrequest拦截
axios.interceptors.response.use(
    (config) => {
        return config
    },
    (error) => {
        return Promise.reject(new Error(error))
    }
)

export default axios