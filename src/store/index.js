import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export const store = createStore({
  state() {
    return {
      characters: [],
      characterDetail: [],
    }
  },
  mutations: {
    SET_CHARACTERS(state, characters) {
      state.characters = characters;
    },
    SET_CHARACTER_DETAIL(state, characterDetail) {
      state.characterDetail = characterDetail;
    },
  },
  getters: {
    characters: (state) => state.characters,
    characterDetail: (state) => state.characterDetail
  },
  actions: {
    getCharacters({ commit }, data ) {
      const { name, page } = data;
      const query = {
        params: {
          name,
          page,
        },
      };

      axios.get(API_URL, query).then(response => {
        commit('SET_CHARACTERS', response.data);
      }).catch(err => {
        if (err.response.status === 404) {
          commit('SET_CHARACTERS', '');
          console.log('error 404 getCharacters');
          throw new Error(`${err.config.url} not found`);
        }
        throw err;
      });
    },
    getCharacterDetail({ commit }, characterId ) {
      axios.get(API_URL + characterId).then(response => {
        commit('SET_CHARACTER_DETAIL', response.data);
      }).catch(err => {
        if (err.response.status === 404) {
          console.log('error 404 getCharacters');
          throw new Error(`${err.config.url} not found`);
        }
        throw err;
      });
    },
  },
});