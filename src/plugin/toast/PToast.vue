<template>
  <transition enter-active-class="fadeInUp" leave-active-class="fadeOut">
    <div v-show="isActive" class="toast" :aria-hidden="!isActive" role="alert">
      <div v-html="message"></div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PToast',
  props: {
    message: String,
    duration: {
      type: Number,
      default: 5000,
    },
  },
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    showNotice() {
      this.parentBottom.insertAdjacentElement('afterbegin', this.$el);

      this.isActive = true;
      this.timer = setTimeout(() => this.close(), this.duration);
    },

    close() {
      clearTimeout(this.timer);
      this.isActive = false;

      setTimeout(() => {
        this.$destroy();
        this.removeElement(this.$el);
      }, 150);
    },

    setupContainer() {
      this.parentBottom = document.querySelector('.notice.is-bottom');
      if (this.parentBottom) {
        return;
      } else {
        this.parentBottom = document.createElement('div');
        this.parentBottom.className = 'notice is-bottom';
      }

      document.body.appendChild(this.parentBottom);
    },

    removeElement(el) {
      if (typeof el.remove !== 'undefined') {
        el.remove();
      } else if (typeof el.parentNode !== 'undefined') {
        el.parentNode.removeChild(el);
      }
    },
  },
  beforeMount() {
    this.setupContainer();
  },
  mounted() {
    this.showNotice();
  },
};
</script>
