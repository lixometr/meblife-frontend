<template>
  <div>
    <ProductsArea :items="items" :info="info" :filters="filters" :isLoading="isLoading" />
  </div>
</template>

<script>
import Loader from "@/components/Loader";
import ProductsArea from "@/components/ProductsArea";
export default {
  name: "CategoryProducts",
  components: {
    Loader,
    ProductsArea,
  },
  props: {
    isLoading: Boolean,
    info: Object,
    items: Array,
    filters: Object,
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" >
</style>