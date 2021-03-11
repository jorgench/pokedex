import Vue from 'vue';
import Vuex from 'vuex';

import Api from '@/lib/repository.js';

Vue.use(Vuex);

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';

export default new Vuex.Store({
  state: {
    page: {
      perPage: 20,
      currentPage: 1,
      maxPage: 5,
    },
    pokemons: [],
    selected: '',
  },
  getters: {
    page(state) {
      return state.page.currentPage;
    },
    allList(state) {
      return state.pokemons;
    },
    hasNext(state) {
      return state.page.currentPage < state.page.maxPage;
    },
  },
  mutations: {
    ADD_POKEMONS(state, payload) {
      state.pokemons = state.pokemons.concat(
        payload.map(i => Object.freeze(i)),
      );
    },
    SET_MAX(state, payload) {
      state.page.maxPage = payload / state.page.perPage;
    },
    ADD_PAGE(state) {
      state.page.currentPage += 1;
    },
    SET_SELECTED(state, payload) {
      state.selected = payload['name'];
    },
  },
  actions: {
    addPage({ state, commit }) {
      return new Promise(res => {
        if (state.page.currentPage > state.page.maxPage) {
          res();
        }

        const offset = (state.page.currentPage - 1) * state.page.perPage;
        console.log('Offset: ',offset);
        Api.get(baseUrl + `?limit=${state.page.perPage}&offset=${offset}`).then(
          data => {
            commit('ADD_PAGE');
            commit('SET_MAX', data.count);
            commit('ADD_POKEMONS', data.results);
            res();
          },
        );
      });
    },
    getDetail({ state }) {
      const idItem = state.selected;

      return new Promise(res => {
        Api.get(baseUrl + `/${idItem}`).then(r => {
          console.log(r);
          res(r);
        });
      });
    },
  },
});
