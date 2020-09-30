<template>
  <div class="product-cnt">
    <div class="product-cnt_btn btn btn-md btn-grey justify-between" :class="elClass" @click="toggle">
      <span class="mr-3">{{value}}</span>
      <svgArrowDown width="15" />
    </div>
      <div class="product-cnt__list shadow" v-if="isOpen">
        <div
          class="product-cnt__list-item btn btn-white pt-2 pb-2 text-14"
          v-for="(item, idx) in max"
          :key="idx"
          @click="select(item)"
        >{{item}}</div>
      </div>
  </div>
</template>

<script>
import svgArrowDown from "@/assets/icons/arrow-down-triangle.svg";
export default {
  props: {
    value: Number,
    max: {
      type: Number,
      default: 20,
    },
    elClass: [Array, Object, String]
  },
  components: {
    svgArrowDown,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {},
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    close() {
      this.isOpen = false;
    },
    select(val) {
      if (val !== this.value) {
        this.close();
      }
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss">
.product-cnt {
  position: relative;
  &__list {
    position: absolute;
    width: 90px;
    overflow-y: auto;
    max-height: 300px;
    z-index: 30;
    &-item {
      display: block !important;
      border-radius: 0;
      border: none;
    }
  }
}
</style>