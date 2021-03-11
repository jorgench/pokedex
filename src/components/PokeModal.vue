<template>
  <section class="card poke-modal">
    <div class="card_image poke-container">
      <img
        v-if="pokemon.item && pokemon.item.detail"
        class="poke-image"
        :src="pokemon.item.detail.image"
        :alt="pokemon.item.name"
      />
    </div>
    <div class="card_content">
      <div class="inner-list" v-if="pokemon.item && pokemon.item.detail">
        <div class="inner-list_item">
          <strong>Name:</strong> {{ pokemon.id | capitalize }}
        </div>
        <div class="inner-list_item">
          <strong>Weight:</strong> {{ pokemon.item.detail.weight }}
        </div>
        <div class="inner-list_item">
          <strong>Height:</strong> {{ pokemon.item.detail.height }}
        </div>
        <div class="inner-list_item">
          <strong>Types:</strong> {{ pokemon.item.detail.types.join(', ') }}
        </div>
      </div>
    </div>
    <div class="card_footer">
      <div class="btn-group space">
        <button class="btn" @click="copy">
          Share to my friends
        </button>
        <poke-fav :idItem="pokemon.id" :fav="pokemon.isChecked"></poke-fav>
      </div>
    </div>
  </section>
</template>

<script>
import PokeFav from '@/components/PokeFav';
import CopyText from '@/lib/copyText.js';

export default {
  name: 'PokeModal',
  components: {
    PokeFav,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      pokemon: {},
    };
  },
  methods: {
    getDetail() {
      this.$store.dispatch('getDetail', this.id).then(r => {
        this.pokemon = r;
      });
    },
    copy() {
      if (this.pokemon.item && this.pokemon.item.detail) {
        let content = [
          `name: ${this.pokemon.id}`,
          `weight: ${this.pokemon.item.detail.weight}`,
          `height: ${this.pokemon.item.detail.height}`,
          `types: ${this.pokemon.item.detail.types}`,
        ];

        const textToCopy = content.join(', ');

        if (CopyText(textToCopy)) {
          this.$toast.open('Se copio la información al portapapeles');
        } else {
          this.$toast.open('No se puede copiar al portapapeles');
        }
      }
    },
  },
  mounted() {
    this.getDetail();
  },
};
</script>
