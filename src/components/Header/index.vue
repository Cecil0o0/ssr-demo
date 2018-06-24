<template>
  <div>
    Header
    <input type="text" v-model="blocks">
  </div>
</template>

<script>
import HeaderModule from './store'

export default {
  asyncData ({ store }) {
    // 动态注册store模块
    store.registerModule('header', HeaderModule)

    return store.dispatch('header/fetchBlocksData')
  },

  destroyed () {
    this.$store.unregisterModule('header')
  },

  computed: {
    blocks: {
      get () {
        return this.$store.state.header.blocks
      },
      set (value) {
        this.$store.commit('header/setBlocksData', value)
      }
    }
  }
}
</script>
