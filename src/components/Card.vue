<template>
  <div>
    <div>
      <FigureRounded small :background-image="thumb" :aria-label="ariaLabel" />
    </div>
    <div>
      <div>
        <h3>
          {{ title }}
        </h3>
        <p>
          {{ text }}
        </p>
      </div>
      <div>
        <button>
          {{ buttonLabel }}
        </button>
      </div>
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
    title: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    buttonLabel: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      default: '',
    },
  },
};
</script>

<style>

</style>
