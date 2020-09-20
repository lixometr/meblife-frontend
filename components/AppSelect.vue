<template>
  <div class="app-select-switcher">
    <div class="app-select-switcher__trigger" @click="toggle">
      {{value}}
      <svgArrowDown width="15" />
    </div>
    <div class="app-select-switcher__list" v-if="isOpen">
      <div
        class="app-select-switcher__item cursor-pointer"
        :class="{'active': value === item}"
        v-for="(item, idx) in items"
        :key="idx"
        @click="selectItem(idx)"
      >{{item.name}}</div>
    </div>
  </div>
</template>

<script>
import svgArrowDown from "@/assets/icons/arrow-down-triangle.svg";

export default {
  props: {
    value: [String, Object, Number],
    options: Array,
    keyField: String
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
</style>