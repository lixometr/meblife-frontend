<template>
  <div class="app-select">
    <div class="app-select__trigger btn btn-md btn-white justify-between" @click="toggle">
      <slot name="trigger">{{value}}</slot>
      <svgArrowDown width="15" />
    </div>
    <div class="app-select__list shadow" v-if="isOpen">
      <div
        class="app-select__list-item cursor-pointer btn btn-white pt-2 pb-2 text-14"
        v-for="(item, idx) in items"
        :key="idx"
        @click="selectItem(idx)"
      >
        <slot name="option">{{item}}</slot>
      </div>
    </div>
  </div>
</template>

<script>
import svgArrowDown from "@/assets/icons/arrow-down-triangle.svg";

export default {
  props: {
    value: [String, Object, Number],
    options: Array,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  components: {
    svgArrowDown,
  },
  computed: {
    items() {
      return this.options;
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    selectItem(idx) {
      this.$emit("input", this.items[idx]);
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss" >
.app-select {
  position: relative;
  &__list {
    position: absolute;
    width: 100%;
    overflow-y: auto;
    max-height: 300px;
    left: 0;
    right: 0;
    bottom: -10px;
    transform: translateY(100%);
    z-index: 30;
    &-item {
      display: block !important;
      border-radius: 0;
      border: none;
    }
  }
}
</style>