<template>
  <div class="menu-modal menu-modal-container bg-pale">
    <div
      class="container pt-4 pb-4 flex align-stretch justify-start flex-column"
    >
      <div class="menu-modal__header flex flex-wrap">
        <div
          class="menu-modal__close flex btn-white align-center justify-center btn btn-circle"
          @click="close"
        >
          <svgClose width="30" />
        </div>
        <SearchBtn :text="$t('menu.search')" variant="light" class="flex-1 ml-5 mr-5" />
        <div class="menu-modal__account btn btn-white align-center btn-md" @click="openPanelAccount">
          {{ $t("menu.account") }} <svgUser class="ml-2" width="15" />
        </div>
      </div>
      <div class="menu-modal__content flex-1">
        <div class="flex" v-if="isLoading" key="isLoading">
          <Loader />
        </div>
        <div key="noLoading">
          <div class="menu-modal__categories-list pt-4">
            <div
              class="menu-modal__categories-item btn btn-md btn-grey mr-3"
              :class="{ active: activeCategorySlug === category.slug }"
              v-for="category in categories"
              :key="category._id"
              @click="selectCategory(category.slug)"
            >
              <svgArrowDown width="20" class="mr-2" />
              <span>{{ category.name }}</span>
            </div>
          </div>
          <div class="menu-modal__categories-content">
            <div
              class="flex justify-center align-center"
              key="categoryLoading"
              v-if="categoryLoading"
            >
              <Loader />
            </div>
            <div key="noCategoryLoading" v-else>
              <MenuModalCategoriesTabs
                :items="categoryChildren"
                :category="activeCategory"
                v-if="categoryChildren.length < 5"
              />
              <MenuModalCategoriesGrid
                :items="categoryChildren"
                :category="activeCategory"
                v-if="
                  categoryChildren.length < 10 && categoryChildren.length >= 5
                "
              />
              <MenuModalCategoriesList
                :items="categoryChildren"
                :category="activeCategory"
                v-if="categoryChildren.length > 10"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import svgClose from "@/assets/icons/close.svg";
import svgArrowDown from "@/assets/icons/arrow-down-triangle.svg";
import svgUser from "@/assets/icons/user.svg";
export default {
  components: {
    svgClose,
    svgArrowDown,
    svgUser,
  },
  data() {
    return {
      isLoading: false,
      categoryLoading: false,
      categories: [],
      activeCategorySlug: "",
      categoryChildren: [],
    };
  },
  async created() {
    await this.fetchItems();
    this.activeCategorySlug = this.categories[0] && this.categories[0].slug
  },
  computed: {
    activeCategory() {
      return (
        this.categories.find((cat) => cat.slug === this.activeCategorySlug) ||
        {}
      );
    },
  },
  methods: {
    openPanelAccount() {
      this.$store.dispatch('modal/closeAll')
      this.$store.dispatch('modal/open', {name: 'panel-account'})
    },
    selectCategory(slug) {
      this.activeCategorySlug = slug;
    },
    async loadCategoryData() {
      this.categoryLoading = true;
      try {
        const categories = await this.$api.$get("categoryChildren", {
          slug: this.activeCategorySlug,
        });
        this.categoryChildren = categories;
      } catch (err) {
        this.$error(err);
      }
      this.categoryLoading = false;
    },
    async fetchItems() {
      this.isLoading = true;

      try {
        const menuCategoriesIds = await this.$api.$get("settingByName", {
          name: "menu_items",
        });
        const resolvers = menuCategoriesIds.map(async (catId) => {
          const category = await this.$api.$get("categoryById", { id: catId });
          return category;
        });
        const categories = await Promise.all(resolvers);
        this.categories = categories;
      } catch (err) {
        this.$error(err);
      }
      this.isLoading = false;
    },
    close() {
      this.$emit("close");
    },
  },
  watch: {
    activeCategorySlug() {
      this.loadCategoryData();
    },
  },
};
</script>

<style lang="scss">
.menu-modal-container {
  overflow: auto!important;
}
.menu-modal {
  width: 100%;
  height: 100%;
  min-width: 900px;
}
</style>