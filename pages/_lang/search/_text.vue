<template>
  <div class="search-page">
    <Header class="default-header" variant="light" />
    <div class="page-header h-auto">
      <div class="container pt-5">
        <SearchInput v-model="text" @search="fetchData" />
        <div class="search-page__items">
          <div class="search-page__products">
            <ProductsArea
              :items="products"
              :info="productsInfo"
              :filters="productsFilters"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FetchProducts from "@/mixins/fetch/FetchProducts";
export default {
  head() {
    return {
      title: "" + this.$store.getters.head.postTitle,
    };
  },
  mixins: [FetchProducts],
  async fetch() {
    await this.fetchData();
  },
  data() {
    return {
      text: this.$route.params.text,
      items: {
        products: {},
      },
    };
  },
  computed: {
    categories() {
      return this.items.categories || {};
    },
    manufacturers() {
      return this.items.manufacturers || {};
    },
  },
  methods: {
    async fetchData() {
      try {
        const result = await this.$api.$get("search", { text: this.text });
        this.items = result;
        await this.fetchProducts("productsSearch", { text: this.text });
      } catch (err) {
        this.$error(err);
      }
    },
  },
  watch: {
      $route() {
          this.fetchData()
      }
  }
};
</script>

<style lang="scss" >
.search-page {
    .page-header {
        height: auto;
    }
}
</style>