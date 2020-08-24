<template>
  <div class="categories-bar__item pl-3">
    
    <AppCollapse v-for="category in items" :key="category.category._id" duration="0">
      <template v-slot:trigger="{open}">
        <div class="categories-bar__trigger user-select-none cursor-pointer">
          <div class="flex align-center justify-between" :class="{'font-bold': open}">
            <nuxt-link
              class="pt-2 pb-2 text-16"
              :to="$url.category(category.category.slug)"
            >{{category.category.name}}</nuxt-link>
            <svgArrowDown
              width="25"
              class="transition"
              :class="{'rotate-180': open}"
              v-if="category.children.length > 0"
            />
          </div>
        </div>
      </template>
      <template v-slot:content="{open}">
        <div v-if="category.children.length > 0">
          <CategoriesBarItem :items="category.children" />
        </div>
      </template>
    </AppCollapse>
  </div>
</template>

<script>
import AppCollapse from "@/components/AppCollapse";
import svgArrowDown from "@/assets/icons/arrow-down-triangle.svg";

export default {
  components: {
    AppCollapse,
    svgArrowDown,
    CategoriesBarItem: () => import("@/components/CategoriesBar/Item"),
  },

  props: {
    items: Array,
  },
};
</script>

<style lang="scss">
</style>