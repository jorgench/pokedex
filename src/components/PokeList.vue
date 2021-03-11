<template>
  <div class="poke-list">
    <div class="wrapper">
      <section class="list">
        <div
          class="item-list"
          v-for="(pokemon, n) in pokemons"
          role="button"
          :key="n"
          @click="$emit('selected', pokemon.id)"
        >
          <div class="content">
            {{ pokemon.item ? pokemon.item.name : pokemon.id }}
          </div>
          <div class="right">
            <poke-fav :idItem="pokemon.id" :fav="pokemon.isChecked"></poke-fav>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Throttle from '@/lib/throttle.js';
import PokeFav from '@/components/PokeFav';

const Offset = 300;

export default {
  name: 'PokeList',
  components: {
    PokeFav,
  },
  props: {
    all: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    pokemons() {
      return this.all
        ? this.$store.getters['extendedItems']
        : this.$store.getters['favoriteItems'];
    },
    hasNext() {
      return this.$store.getters['hasNext'];
    },
  },
  methods: {
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
        if (this.hasNext && this.all) {
          window.removeEventListener('scroll', this.trottleHandler);
          this.getData().then(() => {
            window.addEventListener('scroll', this.trottleHandler);
          });
        }
      }
    },
    initialLoop() {
      this.prevHeight = document.body.offsetHeight;
      this.getData().then(() => {
        if (this.isViewComplete()) {
          if (this.prevHeight < document.body.offsetHeight) {
            this.initialLoop();
          }
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
