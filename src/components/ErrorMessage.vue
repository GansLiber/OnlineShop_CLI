<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  name: 'TwErrorMessage',
  props: {
    message: {
      type: String,
      required: false,
      default: 'Что то пошло не так(('
    }
  }
}
</script>

<style scoped>

</style>