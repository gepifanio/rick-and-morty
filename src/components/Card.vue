<template>
  <div class="card">
    <FigureRounded :background-image="thumb" :aria-label="ariaLabel" />
    <div class="card__content">
      <h2>
        {{ text }}
      </h2>
    </div>
  </div>
</template>

<script>
import FigureRounded from './FigureRounded.vue';

export default {
  components: {
    FigureRounded,
  },
  props: {
    thumb: {
      type: String,
      default: '',
    },
    ariaLabel: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
  },
};
</script>

<style>
.card {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  
  &__content {
    margin-left: 16px;
    display: flex;
    flex-direction: column;
  }
}
</style>