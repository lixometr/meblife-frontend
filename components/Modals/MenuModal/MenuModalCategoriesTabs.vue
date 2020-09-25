<template>
  <div class="menu-categories-tabs flex h-100">
    <div class="menu-categories-tabs__sidebar">
      <div
        class="menu-categories-tabs__sidebar-item cursor-pointer pt-4 pb-4 flex justify-between"
        :class="{ 'active color-orange': activeCategorySlug === item.slug }"
        v-for="item in items"
        :key="item._id"
        @click="selectCategory(item.slug)"
      >
        {{ item.name }} <svgArrowRight width="25" />
      </div>
    </div>
    <div class="menu-categories-tabs__content w-100">
      <div
        class="btn btn-black btn-md cursor-pointer uppercase font-bold"
        @click="openCategory(category.slug)"
      >
        <svgArrowAlbedo width="24" class="mr-2" />{{ $t("menu.showAll") }}
      </div>
      <div class="pt-4">
        <div
          class="flex justify-center align-center"
          v-if="isLoading"
          key="isLoaing"
        >
          <Loader />
        </div>
        <div
          class="menu-categories-tabs__items w-100 flex flex-wrap"
          key="noLoading"
          v-else
        >
          <div
            class="menu-categories-tabs__item "
            v-for="subItem in subItems"
            :key="subItem._id"
            @click="openCategory(subItem.slug)"
          >
            <div class="cursor-pointer flex flex-column align-center p-4 rounded-10 shadow bg-white h-100">
              <div
                class="menu-categories-tabs__item-image position-relative mb-2 flex-1 w-100"
              >
                <AppImage v-bind="subItem.image" contain absoluteFull />
              </div>
              <div
                class="menu-categories-tabs__item-name font-bold text-14 text-center uppercase"
              >
                <span class="truncate white-space-no-wrap">
                  {{ subItem.name }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import svgArrowRight from "@/assets/icons/arrow-right.svg";
import svgArrowAlbedo from "@/assets/icons/arrow-albedo.svg";
export default {
  props: {
    items: Array,
    category: Object,
  },
  components: {
    svgArrowRight,
    svgArrowAlbedo,
  },
  data() {
    return {
      isLoading: false,
      subItems: [],
      activeCategorySlug: "",
    };
  },
  async created() {
    this.activeCategorySlug = this.items[0] && this.items[0].slug;
  },
  methods: {
    async selectCategory(slug) {
      this.activeCategorySlug = slug;
    },
    async fetchItems() {
      this.isLoading = true;

      try {
        const children = await this.$api.$get("categoryChildren", {
          slug: this.activeCategorySlug,
        });
        this.subItems = children;
      } catch (err) {
        this.$error(err);
      }
      this.isLoading = false;
    },
    openCategory(slug) {
      this.$store.dispatch("modal/close", { name: "modal-menu" });
      this.$router.push(this.$url.category(slug));
    },
  },
  watch: {
    activeCategorySlug() {
      this.fetchItems();
    },
  },
};
</script>

<style lang="scss" >
.menu-categories-tabs {
  padding-top: 2.5rem;
  &__sidebar {
    width: 300px;
    margin-right: 2rem;
    &-item {
    }
  }
  &__items {
      margin-left: -1rem;
      margin-right: -1rem;
  }
  &__item {
    height: 240px;
    padding: 1rem;
    width: 33.33%;
  }
}
</style>