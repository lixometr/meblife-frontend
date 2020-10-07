<template>
  <div class="category-page">
    <Header class="default-header" variant="dark" />

    <div class="page-header">
      <AppImage v-bind="headerImage" class="page-header__image" />
      <div class="image-placeholder"></div>

      <CategoryPageHeader
        :breadcrumbs="breadcrumbs"
        :categoryName="categoryFullName"
      />
    </div>
    <div class="category-page__row pt-3">
      <div class="container">
        <div class="">
          <!-- <div class="category-page__categories-block shrink-0 md-hidden">
            <SearchBtn variant="light" text="Категории поиска" />
            <CategoriesBar
              class="md-hidden mt-5"
              :categories="categoriesPrimary"
            />
          </div> -->
          <div class="category-page__content mw-100 flex-1">
            <nuxt-child
              :isLoading="isLoading"
              :products="products"
              :productsInfo="productsInfo"
              :productsFilters="productsFilters"
              :inspirations="inspirations"
              :inspirationsInfo="inspirationsInfo"
              :looks="looks"
              :looksInfo="looksInfo"
              :moduleGroupsTop="moduleGroupsTop"
              :moduleGroupsBottom="moduleGroupsBottom"
              :showProductsGrid="showProductsGrid"
              :showCategoryGrid="showCategoryGrid"
              :categoryChildren="categoryChildren"
              :category="category"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import CategoriesBar from "@/components/CategoriesBar";
import SearchBtn from "@/components/SearchBtn";
import FetchProducts from "@/mixins/fetch/FetchProducts";
import FetchInspirations from "@/mixins/fetch/FetchInspirations";
import FetchLooks from "@/mixins/fetch/FetchLooks";
import { filtersFromQuery } from "@/helpers/functions";
import _ from "lodash";
export default {
  name: "CategorySlug",
  scrollToTop: true,
  head() {
    return {
      title: this.categoryName + this.$store.getters.head.postTitle,
    };
  },
  mixins: [FetchProducts, FetchInspirations, FetchLooks],
  components: {
    Header,
    CategoriesBar,
    SearchBtn,
  },
  async fetch() {
    await this.fetchItems();
  },
  async asyncData({ route, params, $api, error, store, $loader }) {
    $loader.start();
    let category,
      categoryBreadcrumbs,
      categoriesPrimary,
      moduleGroupsTop,
      moduleGroupsBottom,
      categoryChildren;
    try {
      category = await $api.$get("category", { slug: params.slug });
      categoryBreadcrumbs = await $api.$get("categoryParents", {
        slug: params.slug,
      });
      moduleGroupsTop = await store.dispatch("fetchModuleGroups", {
        moduleGroupIds: category.module_groups_top,
      });
      moduleGroupsBottom = await store.dispatch("fetchModuleGroups", {
        moduleGroupIds: category.module_groups_bottom,
        area: "category",
      });
      categoriesPrimary = await $api.$get("categoriesPrimary");
      if (category.show_category_grid) {
        categoryChildren = await $api.$get("categoryChildren", {
          slug: params.slug,
        });
      }
    } catch (err) {
      error({ statusCode: 404, message: err.message });
      $loader.stop();
    }
    $loader.stop();

    return {
      moduleGroupsBottom,
      moduleGroupsTop,
      category,
      categoryBreadcrumbs,
      categoriesPrimary,
      categoryChildren,
    };
  },

  data() {
    return {
      isLoading: false,
      currentPageName: "products",
    };
  },
  created() {
    this.definePageName();
  },
  computed: {
    showCategoryGrid() {
      return this.category.show_category_grid;
    },
    showProductsGrid() {
      return this.category.show_products;
    },

    headerImage() {
      return this.category.bg_image;
    },
    categoryNamePrefix() {
      const prefixes = {
        inspirations: this.$t("category.prefixes.inspirations"),
        "shop-the-looks": this.$t("category.prefixes.shopTheLooks"),
      };
      return prefixes[this.currentPageName] || "";
    },
    categoryFullName() {
      const filterVales = this.$store.getters["filters/valueObj"];
      let sufix = "";
      if (filterVales.manufacturer) {
        sufix += ` - ${filterVales.manufacturer[0].name}`;
      }
      Object.keys(filterVales).map((filterSlug) => {
        const isAttr = this.$store.getters["filters/isAttribute"](filterSlug);
        if (!isAttr) return;
        const attrType = this.$store.getters["filters/getFilterType"](
          filterSlug
        );
        const attrName = this.$store.getters["filters/getFilterName"](
          filterSlug
        );
        const value = filterVales[filterSlug];
        value.forEach((val) => {
          if (attrType === "decimal") {
            sufix += ` - ${attrName}: ${val}`;
          } else {
            sufix += ` - ${attrName}: ${val.name}`;
          }
        });
      });
      return this.categoryName + sufix;
    },
    categoryName() {
      return this.categoryNamePrefix + " " + this.category.name;
    },
    breadcrumbs() {
      const urlCategories = this.categoryBreadcrumbs.map((category) => {
        return {
          ...category,
          full_path: this.$url.category(category.slug),
        };
      });
      return urlCategories;
    },
  },

  methods: {
    async fetchItems() {
      this.isLoading = true;
      if (this.currentPageName === "shop-the-looks") {
        await this.fetchLooks("categoryLooks");
      } else if (this.currentPageName === "inspirations") {
        await this.fetchInspirations("categoryInspirations");
      } else {
        await this.fetchProducts("categoryProducts", {
          slug: this.$route.params.slug,
        });
      }
      this.isLoading = false;
    },
    definePageName() {
      if (this.$route.path.indexOf("shop-the-looks") >= 0) {
        this.currentPageName = "shop-the-looks";
      } else if (this.$route.path.indexOf("inspirations") >= 0) {
        this.currentPageName = "inspirations";
      } else {
        this.currentPageName = "products";
      }
    },
  },
  watch: {
    $route(val) {
      this.definePageName();
      this.fetchItems();
    },
  },
};
</script>

<style lang="scss">
.category-page {
  &__categories-block {
    width: 14rem;
  }
  &__content {
    padding-left: 2.5rem;
    @include md {
      padding-left: 0;
    }
  }
}
</style>