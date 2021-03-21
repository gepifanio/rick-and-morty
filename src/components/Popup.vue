<template>
  <div>
    <h1>test popup</h1>
    <div>{{ data }}</div>
    <button>close</button>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: '',
    },
  },
};
</script>

<style></style>
