<template>
  <TwTopbar />
  <div>
  </div>
  <router-view />
</template>

<script>

import TwTopbar from '@/components/Topbar'

export default {

  components: {
    TwTopbar
  },
  mounted() {
    this.$store.dispatch('loginAgain')
  }
}
</script>

<style>
* {
  margin: 0 auto;
  padding: 0;
}
</style>