<template>
  <button class="btn-fav">
    <icon icon="start" :class="{ 'fav':fav }"></icon>
    <!--icon v-if="fav" icon="start"></icon-->
  </button>
</template>

<script>
export default {
  name: "PokeFav",
  data() {
    return {
      fav: true
    }
  }
}
</script>