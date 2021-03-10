<template>
  <div class="input-container expanded">
    <icon icon="search"></icon>
    <input type="text" :placeholder="placeholder">
  </div>
</template>

<script>
export default {
  name: 'PokeSearch',
  props: {
    placeholder: {
      type: String
    }
  }
}
</script>

<style>

</style>