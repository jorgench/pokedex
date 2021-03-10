<template>
  <div class="poke-list">
    <div class="wrapper">
      <section class="list">
        <div
          class="item-list"
          v-for="(pokemon, n) in pokemons"
          role="button"
          :key="n"
        >
          <div class="content">
            {{ pokemon.name }}
          </div>
          <div class="right">
            <icon icon="start"></icon>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Throttle from '@/lib/helpers.js';

const Offset = 200;

export default {
  name: 'PokeList',
  data() {
    return {
      page: 1,
      lastPage: 5,
      pokemons: [],
    };
  },
  methods: {
    getData() {
      return new Promise(res => {
        const limit = 20;
        const offset = (this.page - 1) * limit;

        fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
        )
          .then(response => response.json())
          .then(data => {
            console.log(data);

            this.lastPage = data.count / limit;
            this.pokemons = this.pokemons.concat(data.results);
            return res();
          });
      });
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
        if (this.page < this.lastPage) {
          this.page += 1;
          window.removeEventListener('scroll', this.trottleHandler);
          this.getData().then(() => {
            window.addEventListener('scroll', this.trottleHandler);
          });
        }
      }
    },
    initialLoop() {
      //console.log(k);

      this.getData().then(() => {
        if (this.isViewComplete()) {
          this.page += 1;
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
