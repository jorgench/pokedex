<template>
  <section class="card poke-modal">
    <div class="card_image poke-container">
      <img
        v-if="detail.sprites"
        class="poke-image"
        :src="detail.sprites.front_default"
        :alt="detail.name"
      />
    </div>
    <div class="card_content">
      <div class="inner-list">
        <div class="inner-list_item">
          <strong>Name:</strong> {{ detail.name }}
        </div>
        <div class="inner-list_item">
          <strong>Weight:</strong> {{ detail.weight }}
        </div>
        <div class="inner-list_item">
          <strong>Height:</strong> {{ detail.height }}
        </div>
        <div class="inner-list_item">
          <strong>Types:</strong> {{ detail.weight }}
        </div>
      </div>
    </div>
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
  data() {
    return {
      detail: {},
    };
  },
  methods: {
    getDetail() {
      this.$store.dispatch('getDetail').then(r => {
        this.detail = r;
      });
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>
