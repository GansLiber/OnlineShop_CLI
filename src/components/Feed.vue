<template>
  <div>Feed{{ apiUrl }}</div>
</template>

<script>
import getFeed from '@/store/modules/feed'
import {mapState} from 'vuex'

export default {
  name: 'TwFeed',
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  mounted() {
    console.log('gabella')
    this.$store.dispatch('getFeed', {apiUrl: this.apiUrl})
    // ...mapState({
    //   data: state => state.feed.data
    // })
    console.log('kirillGamadrill', this.$store.state.feed)
  }
}
</script>

<style scoped>

</style>