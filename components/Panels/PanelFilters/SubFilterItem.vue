<template>
  <div class="panel-sub-filters__item panel-filters__item">
    <div
      class="flex justify-between align-center panel-filters__item-name cursor-pointer"
      @click="toggle"
    >
      <div class="panel-sub-filters__item-name">{{item.name}}</div>
      <div class="panel-sub-filters__item-checkbox">
        <AppSwitcher ref="switcher" :value="value" @input="onChange" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    /*
          name: String,
          slug: String
        */
    item: Object,
    value: Boolean,
  },
  methods: {
    toggle(e) {
      let target = e.target;
      while (target.tagName !== "BODY") {
        if (target === this.$refs.switcher.$el) break;
        target = target.parentNode;
      }
      console.log(target)
      if (target !== this.$refs.switcher.$el) {
        this.$emit("change", !this.value);
      }
    },
    onChange(value) {
      this.$emit("change", value);
    },
  },
};
</script>

<style lang="scss" >
</style>