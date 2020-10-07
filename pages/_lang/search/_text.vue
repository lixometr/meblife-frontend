<template>
  <div class="search-page">
    <Header class="default-header" variant="light" />
    <div class="page-header h-auto">
      <div class="container pt-5">
        <SearchInput v-model="text" @search="onSearch" />
        <div class="search-page__items">
          <div class="search-page__products mt-4">
            <ProductsArea
              :items="products"
              :info="productsInfo"
              :filters="productsFilters"
            />
          </div>
          <div class="search-page__categories mt-4" v-if="categories.items && categories.items.length > 0">
            <SearchCategoriesSlider :items="categories.items" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FetchProducts from "@/mixins/fetch/FetchProducts";
import _ from "lodash";
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
    async onSearch() {
      this.text = _.trim(this.text);
      this.$router.replace({ params: { text: this.text } });
      await this.fetchData();
    },
    async fetchData() {
      this.isLoading = true;
      try {
        const result = await this.$api.$get("search", { text: this.text });
        this.items = result;
        await this.fetchProducts("productsSearch", { text: this.text });
        this.isLoading = false;
      } catch (err) {
        this.isLoading = false;

        this.$error(err);
      }
    },
  },
  watch: {
    $route() {
      this.fetchData();
    },
  },
};
</script>

<style lang="scss" >
.search-page {
  .page-header {
    height: auto;
  }
}
</style>