<template>
  <img
    v-bind="bindAttrs"
    v-on="$listeners"
    :class="classes"
    :src="url"
    v-if="url || !hide"
  />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    url: String,
    hide: Boolean,
    cover: Boolean,
    contain: Boolean,
    absoluteFull: Boolean,
    noBg: Boolean,
  },
  computed: {
    bindAttrs() {
      const receivedAttrs = {
        ...this.$attrs,
      };
      receivedAttrs._id = undefined;
      receivedAttrs.id = undefined;
      return { ...receivedAttrs };
    },
    classes() {
      return {
        "size-cover": this.cover,
        "size-contain": this.contain,
        "absolute-full": this.absoluteFull,
        "no-bg": this.noBg,
      };
    },
  },
};
</script>

<style lang="scss">
</style>