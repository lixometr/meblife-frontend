<template>
  <div class="category-looks position-relative">
    <Loader v-if="isLoading" key="isLoading" />
    <template v-else>
      <LooksArea :items="items"/>
    </template>
  </div>
</template>

<script>
export default {
  name: "Categorylooks",
  inheritAttrs: false,
  props: {
    items: Array,
    isLoading: Boolean,
  },
 

  computed: {
    looks() {
      return this.items;
    },
  },
  methods: {
    
  },
};
</script>

<style lang="scss">
</style>