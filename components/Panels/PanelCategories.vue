<template>
  <Panel
    name="panel-categories"
    headerTheme="dark"
    position="left"
    class="panel-categories"
    @before-open="beforeOpen"
  >
    <template v-slot:title>МЕНЮ</template>
    <template v-slot:content>
      <div class="p-3">
        <SearchBtn variant="light" text="Категории поиска" />
        <Loader v-if="isLoading"/>
        <CategoriesBar class="mt-5" :categories="categories" v-else/>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import CategoriesBar from "@/components/CategoriesBar";
import SearchBtn from "@/components/SearchBtn";
import Loader from "@/components/Loader";
export default {
  components: {
    Panel,
    CategoriesBar,
    SearchBtn,
  },
  data() {
    return {
      categories: [],
      isLoading: false,
    };
  },
  methods: {
    beforeOpen() {
      this.loadCategories();
    },
    async loadCategories() {
      try {
        this.isLoading = true;
        const categories = await this.$api.$get("categoriesPrimary");
        this.categories = categories;
      } catch (err) {
        console.log(err);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss">
</style>