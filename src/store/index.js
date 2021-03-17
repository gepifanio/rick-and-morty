import { createStore } from 'vuex';
import axios from 'axios';


// Create a new store instance.
export const store = createStore({
    state () {
      return {
        count: 0,
        characters: [],
      }
    },
    mutations: {
      increment (state) {
        state.count++
      },
      
      SET_CHARACTERS(state, characters) {
        state.characters = characters
        }
    },
    getters: {},
    actions: {
        getCharacters({ commit }, page) {
            axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`).then(response => { 
                commit('SET_CHARACTERS', response.data);
            });
        },
        getFilteredCharacters({ commit }, characterName) {
            axios.get(`https://rickandmortyapi.com/api/character/?name=${characterName}`).then(response => { 
                commit('SET_CHARACTERS', response.data);
            });
        }
    },
});