<template>
  <div
    class="figure-rounded"
    :class="small ? `figure-rounded--sml` : ''"
    :style="`background-image: url(${backgroundImage});`"
    role="img"
    :aria-label="ariaLabel" />
</template>

<script>
export default {
  props: {
    backgroundImage: {
      type: String,
      default: '',
    },
    ariaLabel: {
      type: String,
      default: '',
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>
.figure {
  &-rounded {
    border-radius: 50%;
    min-width: 130px;
    min-height: 130px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    margin: 0;

    &--sml {
      width: 95px;
      height: 95px;
    }
  }
}
</style>