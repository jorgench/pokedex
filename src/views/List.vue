<template>
  <section class="view flow">
    <div class="content-header">
      <div class="wrapper">
        <poke-search placeholder="Search" v-model="toSearch" @input="search"></poke-search>
      </div>
    </div>

    <div class="content-max">
      <poke-list
        :pokemons="pokemons"
        :loading="loading"
        @goHome="toSearch = ''; selected = 'All'"
        @selected="openModal"
      ></poke-list>
    </div>

    <transition name="inUp">
      <div class="content-footer" v-show="!toSearch">
        <div class="wrapper">
          <div class="btn-group">
            <button
              v-for="(option, k) in options"
              :key="k"
              :class="[
                'btn width-icon expanded',
                { disable: selected !== option.label },
              ]"
              @click="selected = option.label"
            >
              <icon :icon="option.icon"></icon>
              <span>{{ option.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <p-modal :active.sync="seeModal">
      <poke-modal :id="detailId"></poke-modal>
    </p-modal>
  </section>
</template>

<script>
import PokeSearch from '@/components/PokeSearch';
import PokeList from '@/components/PokeList';
import PokeModal from '@/components/PokeModal';

import Throttle from '@/lib/throttle.js';

const Offset = 200;

export default {
  name: 'List',
  components: {
    PokeSearch,
    PokeList,
    PokeModal,
  },
  data() {
    return {
      seeModal: false,
      toSearch: '',
      selected: 'All',
      options: [
        {
          label: 'All',
          icon: 'list',
        },
        {
          label: 'Favorites',
          icon: 'start',
        },
      ],
      detailId: '',
      loading: true,
      pokemonSearch: [],
    };
  },
  computed: {
    hasNext() {
      return this.$store.getters['hasNext'];
    },
    isAll() {
      return this.selected == 'All';
    },
    callMore() {
      return this.toSearch
        ? !this.toSearch
        : this.$store.getters['hasNext'] && this.selected == 'All';
    },
    pokemonsStore() {
      return this.isAll
        ? this.$store.getters['extendedItems']
        : this.$store.getters['favoriteItems'];
    },
    pokemons() {
      return this.toSearch == '' ? this.pokemonsStore : this.pokemonSearch;
    },
  },
  methods: {
    openModal(detail) {
      this.seeModal = true;
      this.detailId = detail;
    },
    search: Throttle(function() {
      this.searchPokemons();
    }, 1000),
    searchPokemons() {
      this.$store.dispatch('search', this.toSearch).then(r => {
        this.pokemonSearch = r;
      });
    },
    /* metodos del scroll */
    getData() {
      return this.$store.dispatch('addPage');
    },
    trottleHandler: Throttle(function() {
      this.handleLoader();
    }, 1000),
    isViewComplete() {
      return (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - Offset
      );
    },
    handleLoader() {
      if (this.isViewComplete()) {
        if (this.callMore) {
          window.removeEventListener('scroll', this.trottleHandler);
          this.getData().then(() => {
            window.addEventListener('scroll', this.trottleHandler);
          });
        }
      }
    },
    initialLoop() {
      this.loading = true;
      this.prevHeight = document.body.offsetHeight;
      this.getData().then(() => {
        if (this.isViewComplete()) {
          if (this.prevHeight < document.body.offsetHeight) {
            this.initialLoop();
          } else {
            this.loading = false;
          }
        } else {
          this.loading = false;
        }
      });
    },
  },
  created() {
    this.initialLoop();
  },
  mounted() {
    window.addEventListener('scroll', this.trottleHandler);
  },
  destroyed() {
    window.removeEventListener('scroll', this.trottleHandler);
  },
};
</script>
