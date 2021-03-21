<template>
    <p class="page-count__label">Showing page {{ currentPage }} of {{ totalPages }}</p>
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

<style>
.page-count {
  &__label {
    font-size: 18px;
  }
}
</style>
