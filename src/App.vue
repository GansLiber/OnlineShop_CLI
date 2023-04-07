<template>
  <TwTopbar />
  <div>
    gg
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
  }
}
</script>

<style>
* {
  margin: 0 auto;
  padding: 0;
}
</style>