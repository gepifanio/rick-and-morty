import { createStore } from 'vuex';
import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export const store = createStore({
  state() {
    return {
      characters: [],
    }
  },
  mutations: {
    SET_CHARACTERS(state, characters) {
      state.characters = characters;
    },
  },
  getters: {
    characters: (state) => state.characters
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
  },
});