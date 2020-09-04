<template>
  <div class="app-switcher" :class="{'active': isActive}" @click="toggle">
    <div class="app-switcher__body">
      <div class="app-switcher__handler"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      active: this.value,
    };
  },
  computed: {
    isActive() {
      return this.active;
    },
  },
  methods: {
    toggle() {
      this.active = !this.active;
      this.$emit("input", this.active);
    },
  },
  watch: {
    value(val) {
      this.active = val;
    },
  },
};
</script>

<style lang="scss">
.app-switcher {
  width: 48px;
  height: 24px;
  cursor: pointer;
  &__body {
    width: 100%;
    height: 100%;
    border-radius: 15px;
    border: 2px solid $grey;
    background-color: $white;
    position: relative;
    transition: $transition;
  }
  &__handler {
    width: 16px;
    height: 16px;
    background-color: $black;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translate(2px, -50%);
    transition: $transition;
    border-radius: 50%;
  }
  &.active {
    .app-switcher__body {
      background-color: $green;
    }
    .app-switcher__handler {
      background: $white;
      transform: translate(25px, -50%);
    }
  }
}
</style>