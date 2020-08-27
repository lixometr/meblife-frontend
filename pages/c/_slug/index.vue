<template>
  <div>
    <Loader v-if="isLoading" />
    <div v-else>
      <ProductsFilters class="mb-3" />
      <div class="mb-3 text-14">100 тоаров | 1 из 10</div>
      <ProductsGrid />
    </div>
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import ProductsGrid from "@/components/ProductsGrid";
import ProductsFilters from "@/components/ProductsFilters";
export default {
  name: "CategoryProducts",
  components: {
    Loader,
    ProductsFilters,
    ProductsGrid,
  },
  props: {
    isLoading: Boolean,
    items: Array,
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" >
</style>