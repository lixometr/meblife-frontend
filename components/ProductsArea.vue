<template>
  <div class="products-area">
    <ProductsFilters :layout.sync="layout" class="mb-3" :items="filters" />
    <Loader v-if="isLoading" />
    <template v-else>
      <div
        class="mb-3 text-14"
        v-if="info"
      >{{totalProducts}} {{itemSclon}} | {{nowPage}} из {{totalPages}}</div>
      <ProductsGrid :layout="layout" :items="items" />
      <Pagination class="mt-3" :totalPages="info.totalPages" :value="nowPage" @input="changePage" />
    </template>
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
      default: () => ({}),
    },
    
    filters: Object,
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ProductsFilters,
    ProductsGrid,

  },
  data(){
    return {
      layout: 2
    }
  },
  created() {
    this.$store.commit("filters/setItems", this.filters);
    this.$store.commit("filters/init", this.$route.query);
  },
  computed: {
    nowPage() {
      if (this.info.nowPage) {
        return this.info.nowPage;
      }

      return 1;
    },
    totalPages() {
      return this.info.totalPages;
    },
    totalProducts() {
      return this.info.totalItems;
    },
    itemSclon() {
      return wordForm(this.totalProducts, this.$t("itemSclon"));
    },
  },
  methods: {
    changePage(newPage) {
      this.$store.commit("filters/setPage", newPage);
      this.$store.dispatch("filters/apply");
    },
  },
  watch: {
    filters() {
      this.$store.commit("filters/setItems", this.filters);
      this.$store.commit("filters/init", this.$route.query);
    },
  },
};
</script>

<style lang="scss">
</style>