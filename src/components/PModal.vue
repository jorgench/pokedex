<template>
  <transition name="fade" @enter="setPreventElement">
    <div
      class="modal"
      ref="modal"
      aria-hidden="false"
      v-if="isActive"
      @click="closeModalOutsite"
    >
      <div class="modal_overlay" tabindex="-1" data-micromodal-close>
        <div class="modal_container" :class="size">
          <button class="modal_boton" @click.stop.prevent="closeModal">
            <icon icon="close"></icon>
          </button>
          <component
            v-if="component"
            v-bind="props"
            v-on="events"
            :is="component"
            @close="closeModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          ></component>
          <slot
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            v-else
          ></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
function removeElement(el) {
  if (typeof el.remove !== 'undefined') {
    el.remove();
  } else if (typeof el.parentNode !== 'undefined') {
    el.parentNode.removeChild(el);
  }
}

export default {
  name: 'PModal',
  props: {
    programatic: {
      type: Boolean,
      default() {
        return false;
      },
    },
    props: Object,
    active: Boolean,
    component: [Object, Function],
    canCancel: { type: Boolean, default: true },
    title: String,
    size: String,
  },
  data() {
    return {
      isActive: this.active || false,
    };
  },
  methods: {
    closeModalOutsite() {
      if (this.canCancel && this.isActive) {
        this.closeModal();
      }
    },
    closeModal() {
      this.$emit('update:active', false);

      if (this.programatic) {
        this.isActive = false;
        setTimeout(() => {
          this.$destroy();
          removeElement(this.$el);
        }, 150);
      }
    },
    setPreventElement() {
      this.$refs.modal
        .querySelector('.modal_container')
        .addEventListener('click', function(evt) {
          evt.stopPropagation();
        });
    },
    programinClose(event) {
      if (event.key == 'Escape' && this.isActive && this.canCancel) {
        this.closeModal();
      }
    },
  },
  beforeMount() {
    if (this.programatic) {
      document.body.appendChild(this.$el);
    }
  },
  mounted() {
    if (this.programatic) this.isActive = true;
    document.addEventListener('keydown', this.programinClose);
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.programinClose);
  },
  watch: {
    active(value) {
      this.isActive = value;
    },
  },
};
</script>
