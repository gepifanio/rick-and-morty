<template>
  <div>
    <button
      ref="trigger"
      aria-controls="modal"
      class="modal__open"
      @click="openDialog">
      <span
        v-html="trigger" />
    </button>
    <div
      id="modal"
      ref="container"
      class="modal"
      aria-hidden="true"
      @click="closeContainer"
      @keypress.esc="closeDialog">
      <div
        ref="modal"
        aria-labelledby="modal-title"
        class="modal__modal"
        role="dialog">
        <div role="document">
          <h2
            id="modal-title"
            v-html="title" />
          <slot />
          <br>
          <button
            class="modal__close"
            aria-label="Close Dialog"
            type="button"
            @click="closeDialog">
            &#x2715;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// modal-open-dialog
// modal-close-dialog
// modal-close-container

export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      default: '',
    },
    trigger: {
      type: String,
      default: '',
      required: true,
    },
  },
  mounted() {
    // Move to end
    this.$refs.container.parentNode.removeChild(this.$refs.container);
    document.body.appendChild(this.$refs.container);
  },
  methods: {
    openDialog() {
      this.$refs.container.classList.add('active');

      const { container, modal } = this.$refs;

      this.$root.$el.setAttribute('aria-hidden', true);

      // Show container and focus the modal
      container.setAttribute('aria-hidden', false);
      modal.setAttribute('tabindex', '-1');


      // Reset scroll
      modal.scrollTop = 0;
      this.$emit('modal-open-dialog');
    },
    closeDialog() {
      const { container, modal } = this.$refs;

      // Hide container
      container.setAttribute('aria-hidden', true);
      modal.removeAttribute('tabindex');

      this.$root.$el.setAttribute('aria-hidden', false);

      // Return focus to trigger
      this.$refs.trigger.focus();
      this.$emit('modal-close-dialog');
    },
    closeContainer(e) {
      if (e.target === this.$refs.container) {
        this.closeDialog();
      }
      this.$emit('modal-close-container');
    },
  },
};
</script>

<style>
/* functional */
body > div[aria-hidden='true']:not(#sitemap) {
  position: fixed;
  width: 100%;
}

.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: none;
  height: 100%;

  /* decorative styles */
  transform: translateZ(0);
  transition: background-color .15s ease-out, visibility .15s ease-out;

  &.active {
    display: block;
  }

  &__modal {
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(100vw - 3.75rem);
    max-height: calc(100vh - 3.75rem);
    padding: 4rem 1.25rem 0;
    overflow: auto;
    transform: translateX(-50%) translateY(-50%);
    transition: opacity .15s ease-out;
    opacity: 0;

    /* decorative styles */
    background-color: #fff;
  }

  &[aria-hidden='true'] {
    visibility: hidden;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    transition: background-color .15s ease-out;

    /* decorative styles */
    background-color: rgba(34, 34, 34, .8);
    box-shadow: 0 3.75rem 0 0 rgba(34, 34, 34, .8);

    .modal__modal {
      opacity: 1;
    }
  }
}

@media all and (min-width: 31.25rem) {
  .modal .modal__modal {
    min-width: 25rem;
    max-width: 37.5rem;
  }
}

.modal__open {
  align-self: flex-start;
}

.modal__close {
  position: absolute;
  top: .5rem;
  right: .5rem;
  padding: .5rem;
  font-size: 2rem;
  line-height: 1.25;
  text-transform: uppercase;
}

</style>