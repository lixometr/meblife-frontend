<template>
  <div class="pt-4">
    <ProductsArea
      :items="products"
      :isLoading="isLoading"
      :filters="productsFilters"
      :info="productsInfo"
    />
  </div>
</template>

<script>
export default {
        inheritAttrs: false,

  props: {
    products: Array,
    productsInfo: Object,
    productsFilters: Object,
    isLoading: Boolean,
    pageData: Object,
  },
};
</script>

<style lang="scss" >
</style>