<template>
  <div class="categories-bar user-select-none">
    <AppCollapse
      v-for="(category, idx) in startCategories"
      :key="category._id"
      duration="0"
      @open="categoryOpen(category.slug)"
    >
      <template v-slot:trigger="{open}">
        <div
          class="categories-bar__trigger pb-2 user-select-none cursor-pointer"
          :class="{'border-bottom border-grey': open}"
        >
          <div class="flex align-center justify-between" :class="{'font-bold': open}">
            <nuxt-link class="pt-2 pb-2 text-18" :to="$url.category(category.slug)">{{category.name}}</nuxt-link>
            <svgArrowDown width="25" class="transition" :class="{'rotate-180': open}" />
          </div>
        </div>
      </template>
      <template v-slot:content>
        <div class="categories-bar__content">
          <Loader v-if="loading[category.slug]" />
          <template v-else>
            <CategoriesBarItem :items="category.children" />
          </template>
        </div>
      </template>
    </AppCollapse>
  </div>
</template>

<script>
import AppCollapse from "@/components/AppCollapse";
import Loader from "@/components/Loader";
import svgArrowDown from "@/assets/icons/arrow-down-triangle.svg";
import CategoriesBarItem from "@/components/CategoriesBar/Item";
export default {
  components: {
    AppCollapse,
    Loader,
    svgArrowDown,
    CategoriesBarItem,
  },
  props: {
    categories: Array,
  },
  data() {
    return {
      loading: {},
      startCategories: this.categories
    };
  },
  methods: {
    async loadCategoryChildren(slug) {
      const catToChangeIndex = this.startCategories.findIndex(cat => cat.slug === slug)
      if(this.startCategories[catToChangeIndex].children) return;
      const result = await this.$api.$get("categoryChildrenAll", { slug });
      this.startCategories[catToChangeIndex].children = result.children;
    },
    async categoryOpen(slug) {
      
      this.$set(this.loading, slug, true);
      await this.loadCategoryChildren(slug);
      this.$set(this.loading, slug, false);
    },
  },
};
</script>

<style lang="scss">
</style>