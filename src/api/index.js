import http from '@/plugins/axios'

export const blocksData = () => {
  return http.get(`/blocks`)
}
