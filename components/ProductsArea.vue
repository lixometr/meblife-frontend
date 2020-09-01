<template>
  <div class="products-area">
    <ProductsFilters class="mb-3" />
    <div class="mb-3 text-14">{{totalProducts}} {{itemSclon}} | {{nowPage}} из {{totalPages}}</div>
    <ProductsGrid :items="items" />
  </div>
</template>

<script>
import ProductsGrid from "@/components/ProductsGrid";
import ProductsFilters from "@/components/ProductsFilters";
import { wordForm } from "@/helpers/functions";

export default {
    props: {
        items: Array,
        info: {
            type: Object,
            default: () => ({})
        }
    },
  components: {
    ProductsFilters,
    ProductsGrid,
  },
  computed: {
      nowPage() {
          if(this.info.nowPage ) {
              return this.info.nowPage 
          }
          if(this.$route.query.page) {
              return this.$route.query.page
          }
          return 1;
      },
      totalPages() {
          return this.info.totalPages
      },
      totalProducts() {
          return this.info.totalProducts
      },
      itemSclon() {
          return wordForm(this.totalProducts, this.$t('itemSclon'));
           
      }
  },
};
</script>

<style lang="scss">
</style>