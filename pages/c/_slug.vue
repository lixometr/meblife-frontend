<template>
  <div class="category-page">
    <Header class="default-header" variant="dark" />

    <div class="page-header">
      <AppImage v-bind="headerImage" class="page-header__image" />
      <div class="image-placeholder"></div>

      <div class="page-header__content">
        <div class="flex flex-column h-100">
          <div class="page-header__title flex-1 flex align-center justify-center flex-column">
            <h1
              class="mw-100 truncate pl-3 pr-3 mb-3 uppercase color-white text-center"
            >{{categoryFullName}}</h1>
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
              :class="{'active': activeRouteInfo}"
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
                <span class="truncate">Вдохновения</span>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="category-page__row pt-3">
      <div class="container">
        <div class="flex">
          <div class="category-page__categories-block shrink-0 md-hidden">
            <SearchBtn variant="light" text="Категории поиска" />
            <CategoriesBar class="md-hidden mt-5" :categories="categoriesPrimary" />
          </div>
          <div class="category-page__content mw-100 flex-1">
            <nuxt-child
              :isLoading="isLoading"
              :items="items"
              :info="itemsInfo"
              :filters="filters"
              :moduleGroupsTop="moduleGroupsTop"
              :moduleGroupsBottom="moduleGroupsBottom"
              :showProductsGrid="showProductsGrid"
            />
          </div>
        </div>
      </div>
    </div>
    <SliderModal />
  </div>
</template>

<script>
import Header from "@/components/Header";
import CategoriesBar from "@/components/CategoriesBar";
import SearchBtn from "@/components/SearchBtn";
import SliderModal from "@/components/Modals/SliderModal";
import { filtersFromQuery } from "@/helpers/functions";
import _ from "lodash";
export default {
  name: "CategorySlug",
  scrollToTop: true,
  head() {
    return {
      title: this.categoryName + " - Meblife",
    };
  },
  components: {
    Header,
    CategoriesBar,
    SearchBtn,
    SliderModal,
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
  async asyncData({ route, params, $api, error, store }) {
    let category,
      categoryBreadcrumbs,
      categoriesPrimary,
      moduleGroupsTop,
      moduleGroupsBottom;
    try {
      category = await $api.$get("category", { slug: params.slug });
      categoryBreadcrumbs = await $api.$get("categoryParents", {
        slug: params.slug,
      });
      // moduleGroupsTop = await store.dispatch(
      //   "fetchModuleGroups",
      //   category.module_groups_top
      // );
      moduleGroupsTop = [
        {
          modules: [
            {
              title: "ПОДВЕСНЫЕ ЛАМПЫ",
              sub_title:
                "для поклонников модных тенденций и вневременной классики",
              description: `Ограничиваться только подвесным светильником не стоит, но и отказываться от него полностью не стоит. Это исключительно функциональный вид светильника, недаром его называют основным освещением. Это также отличный способ ненавязчивого декоративного оформления интерьера. Вы предпочитаете классику вне моды или, может быть, предпочитаете следовать последним тенденциям? В \ o / onder вы найдете гораздо больше ...`,
              more_btn: "Откройте для себя подвесное освещение",
              more_btn_url: "/cat-2",
              module_items: [
                {
                  type: "Category",
                  item: {
                    image: {
                      url:
                        "https://cdn.wonder.pl/cdn-cgi/image/width=1322.5,height=1322.5,quality=85,format=auto/category-image-3b6143ebb982626636b4d190944a9e6c0fbe6d80.jpg",
                    },
                    name: "Освещение в современном стиле",
                  },
                },
                {
                  type: "Category",
                  item: {
                    image: {
                      url:
                        "https://cdn.wonder.pl/cdn-cgi/image/width=1322.5,height=1322.5,quality=85,format=auto/category-image-3b6143ebb982626636b4d190944a9e6c0fbe6d80.jpg",
                    },
                    name: "Освещение в современном стиле",
                  },
                },
                {
                  type: "Category",
                  item: {
                    image: {
                      url:
                        "https://cdn.wonder.pl/cdn-cgi/image/width=1322.5,height=1322.5,quality=85,format=auto/category-image-3b6143ebb982626636b4d190944a9e6c0fbe6d80.jpg",
                    },
                    name: "Освещение в современном стиле",
                  },
                  
                },
                {
                  type: "Category",
                  item: {
                    image: {
                      url:
                        "https://cdn.wonder.pl/cdn-cgi/image/width=1322.5,height=1322.5,quality=85,format=auto/category-image-3b6143ebb982626636b4d190944a9e6c0fbe6d80.jpg",
                    },
                    name: "Освещение в современном стиле",
                  },
                  
                },
                {
                  type: "Category",
                  item: {
                    image: {
                      url:
                        "https://cdn.wonder.pl/cdn-cgi/image/width=1322.5,height=1322.5,quality=85,format=auto/category-image-3b6143ebb982626636b4d190944a9e6c0fbe6d80.jpg",
                    },
                    name: "Освещение в современном стиле",
                  },
                  
                },
                
              ],
              main_image: {
                url:
                  "https://cdn.wonder.pl/cdn-cgi/image/width=1087.5,height=1087.5,quality=85,format=auto/module/35effde5539fe0a04ce7b6966f3c1c4b334b5d82.jpg",
              },

              module_id: 3,
            },
          ],
        },
      ];

      moduleGroupsBottom = await store.dispatch(
        "fetchModuleGroups",
        category.module_groups_bottom
      );
      categoriesPrimary = await $api.$get("categoriesPrimary");
    } catch (err) {
      error({ statusCode: 404, message: err.message });
    }
    return {
      moduleGroupsBottom,
      moduleGroupsTop,
      category,
      categoryBreadcrumbs,
      categoriesPrimary,
    };
  },

  data() {
    return {
      isLoading: false,
      items: [],
      currentPageName: "products",
      itemsInfo: {},
      filters: {},
    };
  },
  created() {
    this.definePageName();
  },
  computed: {
    showProductsGrid() {
      return this.category.show_products
    },
    activeRouteInfo() {
      return this.$route.path === this.$url.category(this.$route.params.slug);
    },
    headerImage() {
      return this.category.bg_image;
    },
    categoryNamePrefix() {
      const prefixes = {
        inspirations: "ВДОХНОВЕНИЯ И СТАТЬИ В КАТЕГОРИИ",
        "shop-the-looks": "ФОТОГРАФИИ ТОВАРОВ ИЗ КАТЕГОРИИ",
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
      // return;
      try {
        const result = await this.$api.$get(
          "categoryProducts",
          {
            slug: this.$route.params.slug,
          },
          {
            params: {
              filters: filtersFromQuery(this.$route.query, true),
              sort_by: this.$route.query.sort_by,
              need_filters: true,
            },
          }
        );

        this.items = result.products;
        this.itemsInfo = result.info;
        this.filters = result.filters;
        this.$store.commit("filters/setItems", this.filters);
        this.$store.commit("filters/init", this.$route.query);
      } catch (err) {
        this.$error(err);
      }
    },
    async fetchLooks() {
      try {
        const result = await this.$api.$get("categoryLooks", {
          slug: this.$route.params.slug,
        });
        this.items = result;
      } catch (err) {
        this.$error(err);
      }
    },
    async fetchInspirations() {
      try {
        const result = await this.$api.$get("categoryInspirations", {
          slug: this.$route.params.slug,
        });
        this.items = result;
      } catch (err) {
        this.$error(err);
      }
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
  &__content {
    padding-left: 2.5rem;
    @include md {
      padding-left: 0;
    }
  }
}
</style>