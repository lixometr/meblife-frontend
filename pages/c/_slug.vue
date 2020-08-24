<template>
  <div class="category-page">
    <Header class="default-header" variant="dark" />

    <div class="page-header">
      <img
        src="https://cdn.wonder.pl/cdn-cgi/image/width=1920,height=1920,quality=85,format=auto/category-image/f58e28f1944986e847ffb0dd3518993ddcbd2a23.jpg"
        class="page-header__image"
        alt
      />
      <div class="image-placeholder"></div>

      <div class="page-header__content">
        <div class="flex flex-column h-100">
          <div class="page-header__title flex-1 flex align-center justify-center flex-column">
            <h1
              class="mw-100 truncate pl-3 pr-3 mb-3 uppercase color-white text-center"
            >{{categoryName}}</h1>
            <div class="flex overflow-auto justify-md-start pl-3 pr-3">
              <nuxt-link to="/" class="btn btn-md btn-blur mr-2 font-bold">Домой</nuxt-link>
              <nuxt-link
                :to="breadcrumb.full_path"
                class="btn btn-md btn-blur mr-2 font-bold"
                active-class="active"
                v-for="(breadcrumb, idx) in breadcrumbs"
                :key="breadcrumb._id"
              >{{breadcrumb.name}}</nuxt-link>
            </div>
          </div>
          <div class="btn-tabs overflow-auto justify-between">
            <nuxt-link
              class="btn-tab mr-2 shrink-0"
              exact-active-class="active"
              :to="$url.category($route.params.slug) "
            >
              <div class="btn pl-3 pr-3 btn-blur font-bold">
                <span class="truncate">Информация</span>
              </div>
            </nuxt-link>
            <nuxt-link
              :to="$url.category($route.params.slug) + '/shop-the-looks' "
              class="btn-tab mr-2 shrink-0 text-decoration-none"
              active-class="active"
            >
              <div class="btn btn-blur pl-3 pr-3 font-bold">
                <span class="truncate">Купить образ</span>
              </div>
            </nuxt-link>
            <nuxt-link
              :to="$url.category($route.params.slug) +'/inspirations' "
              class="btn-tab mr-2 shrink-0 text-decoration-none"
              active-class="active"
            >
              <div class="btn btn-blur pl-3 pr-3 font-bold">
                <span class="truncate">Вдохновения  </span>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="category-page__row pt-3">
      <div class="container">
        <div class="flex">
          <div class="category-page__categories-block shrink-0">
            <SearchBtn variant="light" text="Категории поиска"/>
            <CategoriesBar class="md-hidden mt-5" :categories="categoriesPrimary"/>
          </div>
          <div class="category-page__content pl-3">
            <nuxt-child :isLoading="isLoading" :items="items" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import CategoriesBar from "@/components/CategoriesBar";
import SearchBtn from '@/components/SearchBtn';

export default {
  name: "CategorySlug",
  components: {
    Header,
    CategoriesBar,
    SearchBtn
  },
  async fetch() {
    this.isLoading = true;
    if (this.currentPageName === "shop-the-looks") {
      await this.fetchLooks();
    } else if (this.currentPageName === "inspirations") {
      await this.fetchInspirations();
    } else {
      await this.fetchProducts();
    }
    this.isLoading = false;
  },
  async asyncData({ route, params, $api, error }) {
    let category, categoryBreadcrumbs, categoriesPrimary;
    try {
      category = await $api.$get("category", { slug: params.slug });
      categoryBreadcrumbs = await $api.$get("categoryParents", {
        slug: params.slug,
      });
      categoriesPrimary = await $api.$get('categoriesPrimary')
    } catch (err) {
      error({ statusCode: 404 });
    }
    return {
      category,
      categoryBreadcrumbs,
      categoriesPrimary
    };
  },

  data() {
    return {
      isLoading: false,
      items: [],
      currentPageName: "products",
    };
  },
  created() {
    this.definePageName();
  },
  computed: {
    categoryNamePrefix() {
      const prefixes = {
        inspirations: "ВДОХНОВЕНИЯ И СТАТЬИ В КАТЕГОРИИ",
        "shop-the-looks": "ФОТОГРАФИИ ТОВАРОВ ИЗ КАТЕГОРИИ",
      };
      return prefixes[this.currentPageName] || "";
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
    definePageName() {
      if (this.$route.path.indexOf("shop-the-looks") >= 0) {
        this.currentPageName = "shop-the-looks";
      } else if (this.$route.path.indexOf("inspirations") >= 0) {
        this.currentPageName = "inspirations";
      } else {
        this.currentPageName = "products";
      }
    },
    async fetchProducts() {
      return;
      try {
        const result = await this.$api.$get("categoryProducts", {
          slug: this.$route.params.slug,
        });

        this.items = result.products;
      } catch (err) {}
    },
    async fetchLooks() {
      try {
        const result = await this.$api.$get("categoryLooks", {
          slug: this.$route.params.slug,
        });
      } catch (err) {}
    },
    async fetchInspirations() {
      try {
        const result = await this.$api.$get("categoryInspirations", {
          slug: this.$route.params.slug,
        });
      } catch (err) {}
    },
  },
  watch: {
    $route(val) {
      this.definePageName();
      this.$fetch();
    },
  },
};
</script>

<style lang="scss">
.category-page {
  &__categories-block {
    width: 14rem;
  }
}
</style>