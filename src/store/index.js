import Vue from 'vue';
import Vuex from 'vuex';

import Api from '@/lib/repository.js';

Vue.use(Vuex);

const baseUrl = 'https://pokeapi.co/api/v2/pokemon';
const FAV_KEY = 'fav';

export default new Vuex.Store({
  state: {
    page: {
      perPage: 20,
      currentPage: 1,
      maxPage: 5,
    },
    ids: [],
    pokemonsById: {},
    checkedIds: sessionStorage.getItem(FAV_KEY) ? sessionStorage.getItem(FAV_KEY).split(','): [],
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
    SET_DETAIL(state, { id, detail }) {
      state.pokemonsById[id] = Object.freeze({
        ...state.pokemonsById[id],
        detail,
      });
    },
    SET_CHECKED_ITEM(state, { id }) {
      const index = state.checkedIds.indexOf(id);
      if (index === -1) {
        state.checkedIds.push(id);
      } else {
        state.checkedIds.splice(index, 1);
      }
      sessionStorage.setItem(FAV_KEY, state.checkedIds);
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
    getDetail({ state, commit }, idItem) {
      return new Promise(res => {
        if (state.pokemonsById[idItem] && state.pokemonsById[idItem].detail) {
          return res({
            id: idItem,
            item: state.pokemonsById[idItem],
            isChecked: state.checkedIds.includes(idItem),
          });
        }

        Api.get(baseUrl + `/${idItem}`).then(r => {
          const detail = {
            weight: r.weight,
            height: r.height,
            image: r.sprites['front_default'],
            types: r.types.map(type => {
              return type.type.name;
            }),
          };

          commit('SET_DETAIL', { id: idItem, detail });

          res({
            id: idItem,
            item: state.pokemonsById[idItem],
            isChecked: state.checkedIds.includes(idItem),
          });
        });
      });
    },
  },
});
