import Axios from 'axios'
import { AXIOS_BASE_CONFIG } from '@@/config/base'
import { reqFulfilled, reqRejected, resFulfilled, resRejected } from '@@/config/interceptors'

const axiosInstance = Axios.create(AXIOS_BASE_CONFIG)

// 注入请求拦截器配置
axiosInstance.interceptors.request.use(reqFulfilled, reqRejected)

// 注入响应拦截器配置
axiosInstance.interceptors.response.use(resFulfilled, resRejected)

export default axiosInstance
