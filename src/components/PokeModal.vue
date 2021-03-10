<template>
  <section class="card">
    <div class="card_image"></div>
    <div class="card_content"></div>
    <div class="card_footer">
      <div class="btn-group space">
        <button class="btn">
          Share to my friends
        </button>
        <poke-fav></poke-fav>
      </div>
    </div>
  </section>
</template>

<script>
import PokeFav from '@/components/PokeFav';

export default {
  name: 'PokeModal',
  components: {
    PokeFav,
  },
};
</script>
