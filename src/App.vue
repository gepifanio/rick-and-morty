<template>
  <div class="rick-app">
    <header class="header">
      <h1>Rick and Morty Search App</h1>
      <div class="header__search">
        <input
          class="header__search-input"
          v-model="searchCharacterName"
          id="search-input"
          type="search"
          placeholder="Type to search name"
        />
        <div class="header__btns">
          <button
            class="btn"
            @click="searchCharacter"
            @keydown.enter="searchCharacter"
          >
            Search
          </button>
          <button class="btn" @click="clearSearch">Clear</button>
        </div>
      </div>
    </header>
    <main class="content">
      <div
        class="content__card"
        v-for="(character, index) in characters.results"
        :key="index"
      >
        <Card
          :thumb="character.image"
          aria-label="image alt text"
          :text="character.name"
        />
        <Modal
          title="Character Detail"
          trigger="Open details"
          @modal-open-dialog="getCharacterDetail(index)"
        >
          <CharacterDetail :data="characterDetail" />
        </Modal>
      </div>
      <div v-if="!characters.results">No results found</div>
    </main>
    <footer v-if="characters.results">
      <PageCount :totalPages="totalPages" :currentPage="page" />
      <div class="footer__btns">
        <button class="btn" @click="previousPage">Previous</button>
        <button class="btn" @click="nextPage">Next</button>
      </div>
    </footer>
  </div>
</template>

<script>
import Card from './components/Card.vue';
import PageCount from './components/PageCount.vue';
import CharacterDetail from './components/CharacterDetail.vue';
import Modal from './components/Modal.vue';

export default {
  name: 'App',
  components: {
    Card,
    PageCount,
    CharacterDetail,
    Modal,
  },
  data() {
    return {
      searchCharacterName: '',
      page: 1,
    };
  },
  computed: {
    characters() {
      return this.$store.getters.characters;
    },
    characterDetail() {
      return this.$store.getters.characterDetail;
    },
    totalPages() {
      return this.characters.info.pages;
    },
  },
  methods: {
    nextPage() {
      if (this.characters.info.next) {
        this.page = this.page + 1;
        this.getCurrentPageCharacters();
      }
    },
    previousPage() {
      if (this.characters.info.prev) {
        this.page = this.page - 1;
        this.getCurrentPageCharacters();
      }
    },
    getCurrentPageCharacters() {
      const data = {
        name: this.searchCharacterName,
        page: this.page,
      };
      this.$store.dispatch('getCharacters', data);
    },
    searchCharacter() {
      this.getCurrentPageCharacters();
      this.resetPageNumber();
    },
    clearSearch() {
      this.searchCharacterName = '';
      this.resetPageNumber();
      this.getCurrentPageCharacters();
    },
    resetPageNumber() {
      this.page = 1;
    },
    getCharacterDetail(index) {
      console.log('test', 'ouviu', index);
      this.$store.dispatch('getCharacterDetail', index + 1);
    },
  },
  mounted() {
    this.getCurrentPageCharacters();
  },
};
</script>

<style>
.rick-app {
  padding: 8px 16px;

  @media (min-width: 481px) {
    padding: 24px 72px;
  }

  @media (min-width: 769px) {
    padding: 24px 120px;
  }

  @media (min-width: 1099px) {
    padding: 24px 240px;
  }
}

.header {
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  &__search {
    display: flex;
    justify-content: center;
    flex-direction: column;

    @media (min-width: 769px) {
      flex-direction: row;
    }

    &-input {
      margin-bottom: 16px;
      width: 100%;
      padding: 8px 12px;
      border: 1px solid grey;
      border-radius: 4px;
      color: black;
      font-size: 18px;
      font-weight: 500;
      text-indent: 0.75rem;

      @media (min-width: 769px) {
        margin-bottom: 0;
        margin-right: 16px;
      }
    }
  }

  &__btns {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.content {
  margin-bottom: 24px;

  &__card {
    margin-bottom: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid gray;

    &:first-child {
      padding-top: 24px;
      border-top: 1px solid gray;
    }
  }
}

.footer {
  &__btns {
    display: flex;
  }
}
</style>
