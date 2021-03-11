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
    ids: [],
    pokemonsById: {},
    checkedIds: [],
  },
  getters: {
    page(state) {
      return state.page.currentPage;
    },
    hasNext(state) {
      return state.page.currentPage < state.page.maxPage;
    },
    extendedItems(state) {
      return state.ids.map(id => ({
        id,
        item: state.pokemonsById[id],
        isChecked: state.checkedIds.includes(id),
      }));
    },
  },
  mutations: {
    ADD_POKEMONS(state, payload) {
      payload.forEach(item => {
        state.ids.push(item.name);
        state.pokemonsById[item.name] = Object.freeze(item);
      });
    },
    SET_MAX(state, payload) {
      state.page.maxPage = payload / state.page.perPage;
    },
    ADD_PAGE(state) {
      state.page.currentPage += 1;
    },
  },
  actions: {
    addPage({ state, commit }) {
      return new Promise(res => {
        if (state.page.currentPage > state.page.maxPage) {
          res();
        }

        const offset = (state.page.currentPage - 1) * state.page.perPage;
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
    getDetail(_, idItem) {
      return new Promise(res => {
        Api.get(baseUrl + `/${idItem}`).then(r => {
          console.log(r);
          res(r);
        });
      });
    },
  },
});
