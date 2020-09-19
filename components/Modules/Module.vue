<template>
  <div class="app-module" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    id: [String, Number],
  },
  computed: {
    classes() {
      return [`module-${this.id}`];
    },
  },
};
</script>

<style lang="scss" >
.app-module {
  padding: 0.5em 0;
}
</style>