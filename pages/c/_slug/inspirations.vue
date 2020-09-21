<template>
  <div class="category-inspirations position-relative">
    <Loader v-if="isLoading" key="isLoading" />
    <template v-else>
      <InspirationsArea :items="items" />
    </template>
  </div>
</template>

<script>
export default {
  name: "CategoryInspirations",
  inheritAttrs: false,
  props: {
    items: Array,
    isLoading: Boolean,
  },

  computed: {
    inspirations() {
      return this.items;
    },
  },
};
</script>

<style lang="scss">

</style>