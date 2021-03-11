<template>
  <button class="btn-fav" @click.stop="addFavorite">
    <icon icon="start" :class="{ fav: fav }"></icon>
    <!--icon v-if="fav" icon="start"></icon-->
  </button>
</template>

<script>
export default {
  name: 'PokeFav',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fav: false,
    };
  },
  methods: {
    addFavorite() {},
  },
};
</script>
