<template>
  <div>
    <div class="header">
      <router-link :to="{name : 'mainHeader'}">mainHeader</router-link>
      <router-view name="header"></router-view>
    </div>
    <div class="content">
      <router-view name="content"></router-view>
    </div>
  </div>
</template>

<script>
export default {

}
</script>
