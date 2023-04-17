<template>
  <ul >
    <li v-for='error in errors' class='error'>{{ error }}</li>
  </ul>
</template>

<script>
export default {
  name: 'TwValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true
    }
  },
  computed: {
    errors() {
      return Object.keys(this.validationErrors).map(name => {
        const message = this.validationErrors[name].join(', ')
        return `${name} ${message}`
      })
    }
  }
}
</script>

<style scoped>
.error {
  padding-left: 0;
  max-width: 300px;
  color: #940909;
}

</style>