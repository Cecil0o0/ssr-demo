import http from '@/utils/http'

export const blocksData = () => {
  return http.get(`/blocks`)
}
