<template>
  <div>
    <Loader v-if="isLoading" />
    <div v-else>
      <ProductsArea :items="items" :info="info"/>
    </div>
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
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" >
</style>