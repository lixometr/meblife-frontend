<template>
  <div class="pt-4">
    <ProductsArea
      :items="items"
      :isLoading="isLoading"
      :filters="pageData.filters"
      :info="pageData.info"
    />
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    isLoading: Boolean,
    pageData: Object,
  },
};
</script>

<style lang="scss" scoped>
</style>