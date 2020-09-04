<template>
  <client-only>
    <component
    :is="isStatic ? 'modal' : 'div'"
      :name="name"
      :shiftX="position === 'left' ? 0 : 1"
      :transition="position === 'left' ? 'slideRight' : 'slideLeft'"
      :classes="['panel-modal__modal']"
      overlayTransition="panel-overlay"
      class="panel-modal"
      height="100%"
      width="420px"
      :adaptive="true"
      v-on="$listeners"
    >
      <div class="panel-title p-3 flex justify-between align-center" :class="headerClass">
        <h4 class="mr-2">
          <slot name="title"></slot>
        </h4>
        <div class="panel-buttons flex align-center">
          <slot name="headerButtons"></slot>
          <div
            class="panel-close flex align-center justify-center btn btn-circle"
            :class="{'btn-white': headerTheme === 'dark', 'btn-black': headerTheme === 'light'}"
            @click="close"
         
          >
            <svgClose width="30" />
          </div>
        </div>
      </div>

      <slot name="content"></slot>
    </component>
  </client-only>
</template>

<script>
import svgClose from "@/assets/icons/close.svg";
export default {
  name: "Panel",
  props: {
    // left or right
    position: String,
    name: String,
    // light or dark
    headerTheme: {
      type: String,
      default: "dark",
    },
    isStatic: {
      type: Boolean,
      default: true
    },

  },

  components: {
    svgClose,
  },
  computed: {
    headerClass() {
      return {
        "bg-black color-white": this.headerTheme === "dark",
        "bg-white color-dark": this.headerTheme === "light",
      };
    },
  },
  name: "Panel",
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    close() {
      this.$modal.hide(this.name);
      this.$emit('close')
    },
  },
};
</script>

<style lang="scss" >
.panel-close {
  &:hover {
    border: 1px solid rgba($white, 0.25) !important;
  }
}
</style>