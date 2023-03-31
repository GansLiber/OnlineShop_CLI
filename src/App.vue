<template>
  <TwTopbar />
  <div>
    gg
  </div>
  <router-view />
</template>

<script>

import TwTopbar from '@/components/Topbar'
import getCurrentUser from '@/store/modules/auth'

export default {

  components: {
    TwTopbar
  },
  mounted() {
    this.$store.dispatch('getCurrentUser')
  }
}
</script>

<style>
* {
  margin: 0 auto;
  padding: 0;
}
</style>