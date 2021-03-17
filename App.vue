<template>
  <div>
    <div class="test">Hello {{ name }}!</div>
    <h1>{{ $store.state.count }}</h1>
    <button @click="increment">Increment</button>
    <label for="search">Search for character name:</label>
    <input v-model="searchCharacterName" id="search" type="search" placeholder="Type to search title" />
    <div v-for="(character, index) in characters.results" :key="index">
      <h3>{{ character.name }}</h3>
      <img :src="character.image" />
    </div>
    <div class="pagination">
      <a href="#">❮</a>
      <a href="#">❯</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Vue",
      searchCharacterName: '',
    };
  },
  methods: {
    increment() {
      this.$store.commit("increment");
      console.log(this.$store.state.count);
    },
  },
  computed: {
    characters() {
        const { searchCharacterName } = this;
    this.$store.dispatch("getFilteredCharacters", searchCharacterName);

      return this.$store.state.characters;
    },
  },
  mounted() {
    this.$store.dispatch("getCharacters", (page = 1));
  },
};
</script>

<style>
.test {
  color: red;
}
</style>