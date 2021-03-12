<template>
  <div class="poke-list">
    <div class="wrapper">
      <section class="list" v-if="pokemons.length > 0">
        <div
          class="item-list"
          v-for="(pokemon, n) in pokemons"
          role="button"
          :key="n"
          @click="$emit('selected', pokemon.id)"
        >
          <div class="content">{{ pokemon.id | capitalize }}</div>
          <div class="right">
            <poke-fav :idItem="pokemon.id" :fav="pokemon.isChecked"></poke-fav>
          </div>
        </div>
      </section>
      <div class="poke-list_empty center" v-else>
        <h1 class="title-1">Uh-oh!</h1>
        <p>You look lost on your journey!</p>

        <div class="actions">
          <button class="btn" @click="$emit('goHome')">Go back home</button>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="loading-container" v-if="loading">
        <div class="pokebol"></div>
      </div>
    </transition>
  </div>
</template>

<script>
import PokeFav from '@/components/PokeFav';

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
    loading: {
      type: Boolean,
      default: false,
    },
    pokemons: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
