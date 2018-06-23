<template>
  <div id="app">
    <div>当前访问的URL是：{{url}}</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: '123123'
    }
  }
}
</script>
