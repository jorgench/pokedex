<template>
  <section class="view">
    <div class="welcome content-center wrapper">
      <img class="welcome_image center-image" src="@/assets/pikachu.png" />

      <h2 class="welcome_title title-2">Welcome to Pokédex</h2>

      <p class="welcome_p">
        The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world.
      </p>
      <div class="welcome_action">
        <a class="btn" href="/list">Get started</a>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  methods: {
    openList() {},
  },
};
</script>
