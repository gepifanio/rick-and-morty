<template>
  <div class="character-detail">
    <img class="character-detail__img" :src="data.image" alt="" />
    <p class="character-detail__description">
      This is {{ data.name }} from the {{ data.species }} species and he is
      {{ data.status }}.
    </p>
    <button class="btn character-detail__btn" @click="showEpisodes">
      {{ episodesButtonLabel }}
    </button>
    <transition name="fade">
    <p class="character-detail__description" v-if="displayEpisodes">
      This caracter is in the episodes:
      {{ episodesContent }}
    </p>
    </transition>
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
  data() {
    return {
      displayEpisodes: false,
    };
  },
  methods: {
    showEpisodes() {
      this.displayEpisodes = !this.displayEpisodes;
    },
  },
  computed: {
    episodesButtonLabel() {
      if (this.displayEpisodes) {
        return 'Hide Episodes';
      } else {
        return 'Show Episodes';
      }
    },
    episodesContent() {
      const API_URL = 'https://rickandmortyapi.com/api/episode/';

      const cleanData = this.data.episode.map((episode) =>
        episode.replace(API_URL, '')
      );

      return cleanData.join(', ');
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

  &__btn {
    max-width: 180px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
