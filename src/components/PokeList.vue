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
            {{ pokemon.item.name }}
          </div>
          <div class="right">
            <poke-fav></poke-fav>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Throttle from '@/lib/throttle.js';
import PokeFav from '@/components/PokeFav';

const Offset = 200;

export default {
  name: 'PokeList',
  components: {
    PokeFav,
  },
  computed: {
    pokemons() {
      return this.$store.getters['extendedItems'];
    },
    hasNext() {
      return this.$store.getters['hasNext'];
    }
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
        if (this.hasNext) {
          window.removeEventListener('scroll', this.trottleHandler);
          this.getData().then(() => {
            window.addEventListener('scroll', this.trottleHandler);
          });
        }
      }
    },
    initialLoop() {
      this.getData().then(() => {
        if (this.isViewComplete()) {
          this.initialLoop();
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
