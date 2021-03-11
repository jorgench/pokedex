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
    idItem: {
      type: String,
      default: '',
      required: true,
    },
  },
  computed: {
    fav() {
      return this.$store.state.checkedIds.indexOf(this.idItem) !== -1;
    }
  },
  methods: {
    addFavorite() {
      this.$store.commit('SET_CHECKED_ITEM', { id: this.idItem })
    },
  },
};
</script>
