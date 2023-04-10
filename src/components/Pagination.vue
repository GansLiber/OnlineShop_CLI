<template>
  <ul>
    <li
      v-for='page in pages'
      :key='page'
      :class='{active: currentPage===page}'
    >
      <router-link :to='{query:{page:page} }'>
        {{ page }}
      </router-link>
    </li>
  </ul>
</template>

<script>
import {range} from '@/helpers/utils'

export default {
  name: 'TwPagination',
  props: {
    total: {
      type: Number,
      required: true
    },
    limit: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    pages() {
      const pagesCount = Math.ceil(this.total / this.limit)
      return range(1, pagesCount)
    }
  }
}
</script>
<style scoped>
ul {
  list-style: none;
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
}

li {
  margin: 0 5px;
}

a {
  display: inline-block;
  padding: 5px 10px;
  color: #333;
  background-color: #fff;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease;
}

a:hover {
  background-color: #f1f1f1;
}

.active a {
  color: #fff;
  background-color: #333;
}
</style>

<style scoped>

</style>