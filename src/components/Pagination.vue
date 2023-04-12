<template>
  <div class='pagination'>
    <ul>
      <li v-for='(page, index) in pages' :key='index' :class='{ active: currentPage === page }'>
        <a @click.prevent='setCurrentPage(page)'>{{ page }}</a>
      </li>
    </ul>
    <div class='items'>
   
    </div>
  </div>
</template>
<script>
export default {
  name: 'TwPagination',
  props: {
    items: {
      type: Array,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      currentPage: 1
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.items.length / this.perPage)
    },
    pages() {
      const range = []
      for (let i = 1; i <= this.pageCount; i++) {
        range.push(i)
      }
      return range
    },
    paginatedItems() {
      const start = (this.currentPage - 1) * this.perPage
      const end = start + this.perPage
      return this.items.slice(start, end)
    }
  },
  methods: {
    setCurrentPage(page) {
      this.currentPage = page
      this.$emit('page-changed', this.paginatedItems)
    }
  },
  mounted() {
    this.setCurrentPage(1)
  }
}
</script>
<style scoped>
.pagination {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
}

ul {
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  display: inline-block;
  padding: 5px 10px;
  color: #333;
  background-color: #fff;
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: default;
}

a:hover {
  background-color: #f1f1f1;
}

.active a {
  color: #fff;
  background-color: #333;

}

.items {
  margin-top: 20px;
}
</style>
