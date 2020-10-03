<template>
  <div class="manufacturer-page">
    <Header class="default-header" variant="dark" />
    <div class="page-header">
      <AppImage v-bind="headerImage" class="page-header__image" />
      <div class="image-placeholder"></div>
      <div class="page-header__content">
        <div class="flex flex-column h-100">
          <div
            class="page-header__title flex-1 flex align-center justify-center flex-column"
          >
            <div>
              <h4 class="text-left color-white manufacturer-page__pre-title">
                {{ $t("manufacturerTitle") }}
              </h4>
              <h1
                class="mw-100 truncate pl-3 pr-3 mb-3 uppercase color-white text-center"
              >
                {{ manufacturerName }}
              </h1>
            </div>
          </div>
          <div class="btn-tabs overflow-auto justify-between">
            <nuxt-link
              class="btn-tab mr-2 shrink-0"
              exact-active-class="active"
              :class="{ active: activeRouteInfo }"
              :to="$url.manufacturer($route.params.slug)"
            >
              <div class="btn pl-3 pr-3 btn-blur font-bold">
                <span class="truncate">{{ $t("brandInfo") }}</span>
              </div>
            </nuxt-link>
            <nuxt-link
              :to="$url.manufacturer($route.params.slug) + '/categories'"
              class="btn-tab mr-2 shrink-0 text-decoration-none"
              active-class="active"
            >
              <div class="btn btn-blur pl-3 pr-3 font-bold">
                <span class="truncate">{{ $t("categories") }}</span>
              </div>
            </nuxt-link>

            <nuxt-link
              :to="$url.manufacturer($route.params.slug) + '/collections'"
              class="btn-tab mr-2 shrink-0 text-decoration-none"
              active-class="active"
            >
              <div class="btn btn-blur pl-3 pr-3 font-bold">
                <span class="truncate">{{ $t("collections") }}</span>
              </div>
            </nuxt-link>
            <nuxt-link
              :to="$url.manufacturer($route.params.slug) + '/products'"
              class="btn-tab mr-2 shrink-0 text-decoration-none"
              active-class="active"
            >
              <div class="btn btn-blur pl-3 pr-3 font-bold">
                <span class="truncate">{{ $t("products") }}</span>
              </div>
            </nuxt-link>
            <nuxt-link
              :to="$url.manufacturer($route.params.slug) + '/shop-the-looks'"
              class="btn-tab mr-2 shrink-0 text-decoration-none"
              active-class="active"
            >
              <div class="btn btn-blur pl-3 pr-3 font-bold">
                <span class="truncate">{{ $t("buyLook") }}</span>
              </div>
            </nuxt-link>
            <nuxt-link
              :to="$url.manufacturer($route.params.slug) + '/video'"
              class="btn-tab mr-2 shrink-0 text-decoration-none"
              active-class="active"
              v-if="manufacturer.videos && manufacturer.videos.length > 0"
            >
              <div class="btn btn-blur pl-3 pr-3 font-bold">
                <span class="truncate">{{ $t("video") }}</span>
              </div>
            </nuxt-link>
            <nuxt-link
              :to="$url.manufacturer($route.params.slug) + '/history'"
              class="btn-tab mr-2 shrink-0 text-decoration-none"
              active-class="active"
            >
              <div class="btn btn-blur pl-3 pr-3 font-bold">
                <span class="truncate">{{ $t("brandHistory") }}</span>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="manufacturer-content">
      <div class="container">
        <nuxt-child
          :isLoading="isLoading"
          :items="items"
          :products="products"
          :productsInfo="productsInfo"
          :inspirations="inspirations"
          :inspirationsInfo="inspirationsInfo"
          :looks="looks"
          :looksInfo="looksInfo"
          :productsFilters="productsFilters"
          :pageData="pageData"
        ></nuxt-child>
      </div>
      <div class="manufacturer-links pt-5">
        <nuxt-link
          class="manufacturer-links__item bg-grey border-bottom border-white p-3 font-bold text-center flex justify-center"
          :to="$url.manufacturer($route.params.slug)"
        >
          <span class="ml-auto">{{ $t("brandInfo") }}</span>
          <svgArrowRight class="ml-auto" width="28" />
        </nuxt-link>
        <nuxt-link
          class="manufacturer-links__item bg-grey border-bottom border-white p-3 font-bold text-center flex justify-center"
          :to="$url.manufacturer($route.params.slug) + '/categories'"
        >
          <span class="ml-auto">{{ $t("categories") }}</span>
          <svgArrowRight class="ml-auto" width="28" />
        </nuxt-link>
        <nuxt-link
          class="manufacturer-links__item bg-grey border-bottom border-white p-3 font-bold text-center flex justify-center"
          :to="$url.manufacturer($route.params.slug) + '/collections'"
        >
          <span class="ml-auto">{{ $t("collections") }}</span>
          <svgArrowRight class="ml-auto" width="28" />
        </nuxt-link>
        <nuxt-link
          class="manufacturer-links__item bg-grey border-bottom border-white p-3 font-bold text-center flex justify-center"
          :to="$url.manufacturer($route.params.slug) + '/products'"
        >
          <span class="ml-auto">{{ $t("products") }}</span>
          <svgArrowRight class="ml-auto" width="28" />
        </nuxt-link>
        <nuxt-link
          class="manufacturer-links__item bg-grey border-bottom border-white p-3 font-bold text-center flex justify-center"
          :to="$url.manufacturer($route.params.slug) + '/shop-the-looks'"
        >
          <span class="ml-auto">{{ $t("buyLook") }}</span>
          <svgArrowRight class="ml-auto" width="28" />
        </nuxt-link>
        <nuxt-link
          class="manufacturer-links__item bg-grey border-bottom border-white p-3 font-bold text-center flex justify-center"
          :to="$url.manufacturer($route.params.slug) + '/video'"
          v-if="manufacturer.videos && manufacturer.videos.length > 0"
        >
          <span class="ml-auto">{{ $t("video") }}</span>
          <svgArrowRight class="ml-auto" width="28" />
        </nuxt-link>
        <nuxt-link
          class="manufacturer-links__item bg-grey border-bottom border-white p-3 font-bold text-center flex justify-center"
          :to="$url.manufacturer($route.params.slug) + '/history'"
        >
          <span class="ml-auto">{{ $t("brandHistory") }}</span>
          <svgArrowRight class="ml-auto" width="28" />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import FetchProducts from "@/mixins/fetch/FetchProducts";
import FetchInspirations from "@/mixins/fetch/FetchInspirations";
import FetchLooks from "@/mixins/fetch/FetchLooks";
import svgArrowRight from "@/assets/icons/arrow-right.svg";
export default {
  head() {
    return {
      title: this.manufacturerName,
    };
  },
  components: {
    svgArrowRight,
  },
  mixins: [FetchProducts, FetchInspirations, FetchLooks],
  async fetch() {
    await this.fetchItems();
  },
  async asyncData({ error, $api, params, store, $loader }) {
    $loader.start();
    try {
      const manufacturer = await $api.$get("manufacturer", {
        slug: params.slug,
      });
      $loader.stop();

      return {
        manufacturer,
      };
    } catch (err) {
      $loader.stop();

      error(err);
    }
  },
  data() {
    return {
      currentPageName: "",
      isLoading: false,
      items: [],
      pageData: {},
    };
  },

  computed: {
    tabs() {
      return {};
    },
    activeRouteInfo() {
      return (
        this.$route.path === this.$url.manufacturer(this.$route.params.slug)
      );
    },
    manufacturerName() {
      return this.manufacturer.name;
    },
    headerImage() {
      return this.manufacturer.header_image;
    },
  },
  created() {
    this.definePageName();
  },
  methods: {
    definePageName() {
      if (this.$route.path.indexOf("shop-the-looks") >= 0) {
        this.currentPageName = "shop-the-looks";
      } else if (this.$route.path.indexOf("collections") >= 0) {
        this.currentPageName = "collections";
      } else if (this.$route.path.indexOf("products") >= 0) {
        this.currentPageName = "products";
      } else if (this.$route.path.indexOf("categories") >= 0) {
        this.currentPageName = "categories";
      } else if (this.$route.path.indexOf("history") >= 0) {
        this.currentPageName = "history";
      } else if (this.$route.path.indexOf("video") >= 0) {
        this.currentPageName = "video";
      } else {
        this.currentPageName = "info";
      }
    },
    async fetchCategories() {
      const categories = await this.$api.$get("categoriesByManufacturer", {
        slug: this.manufacturer.slug,
      });
      this.items = categories;
      this.pageData = {
        manufacturerName: this.manufacturerName,
      };
    },

    async fetchHistory() {
      this.pageData = {
        history: this.manufacturer.history,
      };
    },
    async fetchInfo() {
      let moduleGroups = [];
      moduleGroups = await this.$store.dispatch(
        "fetchModuleGroups",
       {moduleGroupIds:  this.manufacturer.module_groups, area: 'manufacturer'}
      );
      this.pageData = {
        moduleGroups,
        image: this.manufacturer.image,
      };
    },
    async fetchVideo() {
      this.pageData = {
        videos: this.manufacturer.videos,
      };
    },
    async fetchItems() {
      this.isLoading = true;
      try {
        if (this.currentPageName === "products") {
          await this.fetchProducts("manufacturerProducts", {slug: this.$route.params.slug});
        } else if (this.currentPageName === "categories") {
          await this.fetchCategories();
        } else if (this.currentPageName === "collections") {
          await this.fetchInspirations("manufacturerInspirations");
        } else if (this.currentPageName === "shop-the-looks") {
          await this.fetchLooks("manufacturerLooks");
        } else if (this.currentPageName === "history") {
          await this.fetchHistory();
        } else if (this.currentPageName === "video") {
          await this.fetchVideo();
        } else {
          await this.fetchInfo();
        }
      } catch (err) {
        this.$error(err);
      }
      this.isLoading = false;
    },
  },
  watch: {
    $route() {
      this.definePageName();
      this.fetchItems();
    },
  },
};
</script>

<style lang="scss" >
.manufacturer-page {
  &__pre-title {
    font-weight: normal;
    margin-left: -6rem;
  }
}
</style>