<template>
  <div class="panel-sub-filters__item panel-filters__item">
    <div class="flex justify-between align-center panel-filters__item-name cursor-pointer" @click="toggle">
      <div class="panel-sub-filters__item-name ">{{item.name}}</div>
      <div class="panel-sub-filters__item-checkbox">
        <AppSwitcher :value="value" @input="onChange"/>
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
    toggle() {
      this.$emit('change', !this.value)
    },
    onChange(value) {
      this.$emit('change', value)
    }
  }
};
</script>

<style lang="scss" >
</style>