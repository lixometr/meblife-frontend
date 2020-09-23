<template>
  <div>
    <ModulesArea
      v-for="moduleGroup in moduleGroupsTop"
      :key="moduleGroup._id"
      v-bind="moduleGroup"
    />
    <ProductsArea :items="products" :info="productsInfo" :filters="productsFilters" :isLoading="isLoading" v-if="showProductsGrid"/>
    <CategoryGrid :items="categoryChildren" v-if="showCategoryGrid"/>
    <ModulesArea
      v-for="moduleGroup in moduleGroupsBottom"
      :key="moduleGroup._id"
      v-bind="moduleGroup"
    />
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import ProductsArea from "@/components/ProductsArea";
export default {
  name: "CategoryProducts",
  inheritAttrs: false,
  components: {
    Loader,
    ProductsArea,
  },
  props: {
    isLoading: Boolean,
    productsInfo: Object,
    products: Array,
    productsFilters: Object,
    moduleGroupsTop: Array,
    moduleGroupsBottom: Array,
    showProductsGrid: Boolean,
    showCategoryGrid: Boolean,
    categoryChildren: Array
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" >
</style>