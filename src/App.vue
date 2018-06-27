<template>
  <div id="app">
    <router-link :to="{name: 'layout-v1'}">点击跳转至layout-v1{{url}}</router-link>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  props: {
    url: String
  },
  title () {
    return 'SSR DEMO'
  }
}
</script>

<style lang="stylus">
body
  background-color #e5e5e5
</style>
