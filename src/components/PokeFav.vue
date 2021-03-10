<template>
  <button class="fav">
    <icon icon="start">
    <icon v-if="fav" icon="start">
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