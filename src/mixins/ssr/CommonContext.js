/*
 * @Author: Cecil
 * @Last Modified by: Cecil
 * @Last Modified time: 2018-06-27 00:20:22
 * @Description 无
 */

function getTitle(vm) {
  // 组件可以提供一个 `title` 选项
  // 此选项可以是一个字符串或函数
  const { title } = vm.$options
  if (title) {
    return typeof title === 'function' ? title.call(vm) : title
  }
}

const serverTitleMixin = {
  created() {
    const title = getTitle(this)
    if (title) {
      this.$ssrContext.title = title
    }
  }
}

const clientTitleMixin = {
  mounted() {
    const title = getTitle(this)
    if (title) {
      document.title = title
    }
  }
}

export const title = (process.env.VUE_SSR === 'server' ? serverTitleMixin : clientTitleMixin)
