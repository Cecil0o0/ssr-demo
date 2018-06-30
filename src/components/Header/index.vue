<template>
  <div>
    Header
    <input type="text" v-model="blocks">
  </div>
</template>

<script>
import HeaderModule from './store'

export default {
  async asyncData ({ store }) {
    await store.dispatch('header/fetchBlocksData')
  },

  $autoStoreModule: {
    name: 'header',
    moduleData: HeaderModule
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
