import Axios from 'axios'
import { dataServer, isMock } from '@@/config'
const PREFIX = isMock ? '/mock' : '/api'

const axios = Axios.create({
  baseURL: `${dataServer.schema}://${dataServer.host}:${dataServer.port}${PREFIX}`,
  timeout: 5000,
  headers: {
    'X-Client': 'axios'
  }
})

export default axios
