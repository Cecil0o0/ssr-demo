import axios from 'axios'
const PREFIX = '/api'
const PORT = 4000

export const blocksData = () => {
  return axios.get(`http://localhost:${PORT}${PREFIX}/blocks`)
}
