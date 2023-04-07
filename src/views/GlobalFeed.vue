<template>
  <div class='home'>
    <div>
      <h3>Просто купить - лучший выбор на рынке</h3>
    </div>
    <TwFeed :api-url='apiUrl'></TwFeed>
  </div>
</template>

<script>
// @ is an alias to /src
import Feed from '@/components/Feed'
import TwFeed from '@/components/Feed'

export default {
  name: 'TwGlobalFeed',
  components: {TwFeed},
  data() {
    return {
      apiUrl: '/products'
    }
  }
}
</script>
<style scoped>
.home > div {
  height: 20em;
  display: flex;
  align-items: center;
}

h3 {
  font-size: 3em;
}
</style>