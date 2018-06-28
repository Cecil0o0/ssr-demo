import Axios from 'axios'
import { AXIOS_BASE_CONFIG } from '@@/config/base'
import { reqFulfilled, reqRejected, resFulfilled, resRejected } from '@@/config/interceptors'

const axios = Axios.create(AXIOS_BASE_CONFIG)

// 注入请求拦截器配置
axios.interceptors.request.use(reqFulfilled, reqRejected)

// 注入响应拦截器配置
axios.interceptors.response.use(resFulfilled, resRejected)

export default axios
