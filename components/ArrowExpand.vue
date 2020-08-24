<template>
  <div class="arrow-expand">
    <client-only>
      <div class="arrow-expand-area" v-show-slide="isOpen">
        <slot></slot>
      </div>
    </client-only>

    <div class="arrow-expand__trigger mt-3">
      <div
        class="btn btn-red flex align-center z-1"
        :class="{'btn-circle btn-circle-lg': !this.$slots.btnText, 'btn-md': this.$slots.btnText}"
        @click="expand"
      >
        <slot name="btnText"></slot>
        <svgArrowDown class="arrow-expand__svg" :class="{'rotate-180': isOpen}" width="40" />
      </div>
    </div>
  </div>
</template>

<script>
import svgArrowDown from "@/assets/icons/arrow-down-sm.svg";
export default {
  components: {
    svgArrowDown,
  },

  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    expand() {
      this.isOpen = !this.isOpen;
      this.$emit("expand");
    },
  },
};
</script>

<style lang="scss">
.arrow-expand {
  &__svg {
    transition: transform 0.3s;
  }
  &__trigger {
    position: relative;
    display: flex;
    justify-content: center;
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      display: block;
      width: 100%;
      height: 2px;
      background-color: $grey;
      z-index: 0;
    }
  }
}
</style>