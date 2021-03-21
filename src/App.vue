<template>
  <div>
    <header class="header">
      <h1>Rick and Morty Character Finder</h1>
      <label class="header__search-label" for="search-input">Search for name:</label>
      <input
        class="header__search-input"
        v-model="searchCharacterName"
        id="search-input"
        type="search"
        placeholder="Type to search name"
      />
      <div class="header__btns">
        <button class="header__btn" @click="searchCharacter" @keydown.enter="searchCharacter">
          Search
        </button>
        <button class="header__btn" @click="clearSearch">Clear</button>
      </div>
    </header>
    <main>
      <div>
        <div
          v-for="(character, index) in characters.results"
          :key="index"
        >
          <Card
            :thumb="character.image"
            aria-label="image alt text"
            title="Character"
            :text="character.name"
          />
          <button @click="openDetailsClick(index)">Open details</button>
        </div>
        <div v-if="!characters.results">No results found</div>
      </div>
      <div>
        <Popup v-if="openDetails" :data="characterDetail" />
      </div>
    </main>
    <footer v-if="characters.results">
      <Pagination :totalPages="totalPages" :currentPage="page" />
      <button @click="previousPage">
        Previous Page
      </button>
      <button @click="nextPage">
        Page next
      </button>
    </footer>
  </div>
</template>

<script>
import Card from './components/Card.vue';
import Pagination from './components/Pagination.vue';
import Popup from './components/Popup.vue';

export default {
  name: 'App',
  components: {
    Card,
    Pagination,
    Popup
  },
  data() {
    return {
      searchCharacterName: '',
      page: 1,
      openDetails: false,
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
    openDetailsClick(index) {
      this.getCharacterDetail(index);
      this.openDetails = true;
    },
    getCharacterDetail(index) {
      this.$store.dispatch('getCharacterDetail', index + 1);
    }
  },
  mounted() {
    this.getCurrentPageCharacters();
  },
};
</script>

<style>
.header {
  display: flex;
  flex-direction: column;

  &__search {

    &-label {
      font-size: 20px;
      margin-bottom: 16px;
    }

    &-input {
      margin-bottom: 16px;
    }
  }

  &__btns {
    
  }

  &__btn {

  }
}


</style>
