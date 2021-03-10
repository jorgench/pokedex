<template>
  <span class="icon">
    <svg>
      <use :xlink:href="nameIcon"></use>
    </svg>
  </span>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    nameIcon() {
      return '#svg_' + this.icon.toLowerCase();
    }
  }
}
</script>