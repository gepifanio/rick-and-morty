<template>
  <div class="character-detail">
    <img class="character-detail__img" :src="data.image" alt="" />
    <p class="character-detail__description">
      This is {{ data.name }} from the {{ data.species }} species and he is
      {{ data.status }}.
    </p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: '',
    },
  },
};
</script>

<style>
.character-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__img {
    width: 100%;
    max-width: 400px;
    height: auto;
    margin-bottom: 24px;
  }

  &__description {
    font-size: 18px;
  }
}
</style>
