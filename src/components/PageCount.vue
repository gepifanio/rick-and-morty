<template>
  <div>
    <p>Showing page {{ currentPage }} of {{ totalPages }}</p>
  </div>
</template>

<script>
export default {
  props: {
    totalPages: {
      type: Number,
      default: '',
    },
    currentPage: {
      type: Number,
      default: '',
    },
  },
};
</script>

<style></style>
