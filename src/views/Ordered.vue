<template>
  <div class='home'>
    <div class='banner'>
      <img src='#' alt='Просто купить'>
      <div class='banner-text'>
        <h3>Заказано</h3>
      </div>
    </div>
    <TwFeed
      :api-url='apiUrl'
      :type-par='typeFeed'
    ></TwFeed>
  </div>
</template>


<script>
// @ is an alias to /src
import TwFeed from '@/components/Feed'

export default {
  name: 'TwOrdered',
  components: {TwFeed},
  data() {
    return {
      apiUrl: '/order',
      typeFeed: 'order'
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

.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.banner {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
  margin-bottom: 50px;
}

.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.banner-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #98430b;
}

.banner-text h3 {
  font-size: 3rem;
  margin: 0;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>