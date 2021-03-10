<template>
  <div class="input-container expanded">
    <icon icon="search"></icon>
    <input type="text" v-model="newValue" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: 'PokeSearch',
  props: {
    placeholder: {
      type: String,
    },
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      newValue: this.value,
    };
  },
  watch: {
    value(newValue) {
      this.newValue = newValue;
    },
    newValue(newValue) {
      this.$emit('input', newValue);
    },
  },
};
</script>
