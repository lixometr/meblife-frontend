<template>
  <div class="category-inspirations position-relative">
    <Loader v-if="isLoading" key="isLoading" />
    <template v-else>
      <InspirationsArea :items="inspirations" :info="inspirationsInfo"/>
    </template>
  </div>
</template>

<script>
export default {
  name: "CategoryInspirations",
  inheritAttrs: false,
  props: {
    inspirations: Array,
    inspirationsInfo: Object,
    isLoading: Boolean,
  },

  computed: {
   
  },
};
</script>

<style lang="scss">

</style>