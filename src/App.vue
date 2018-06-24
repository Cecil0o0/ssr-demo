<template>
  <div id="app">
    <router-link :to="{name: 'layout-v1'}">点击跳转至layout-v1</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  props: {
    url: String
  }
}
</script>
