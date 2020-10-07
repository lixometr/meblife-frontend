<template>
  <div class="products-grid pl-2 pr-2">
    <PanelProductPreview />

    <!-- <PanelFilters @filterItems="onApplyFilters"/> -->
    <div
      class="products-grid__wrapper flex flex-wrap position-relative z-1"
      :class="layoutClass"
    >
      <ProductsGridItem
        class="products-grid__item"
        v-for="product in products"
        :key="product._id"
        :item="product"
      />
    </div>
  </div>
</template>

<script>
import ProductsGridItem from "@/components/ProductsGridItem";
// import PanelFilters from "@/components/Panels/PanelFilters";
import PanelProductPreview from "@/components/Panels/PanelProductPreview";

export default {
  components: {
    ProductsGridItem,
    PanelProductPreview,
    // PanelFilters,
  },
  props: {
    items: Array,
    layout: Number,
  },
  computed: {
    products() {
      return this.items;
    },
    layoutClass() {
      return {
        "col-2": this.layout === 2,
        "col-3": this.layout === 3,
        "col-4": this.layout === 4,
      };
    },
  },
  methods: {
    onApplyFilters(event) {
      console.log("apply filters", event);
    },
  },
};
</script>

<style lang="scss">
.products-grid {
  min-width: 400px;
  @include sm {
    min-width: auto;
  }
  &__wrapper {
    width: 100%;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }
  &__wrapper.col-2 {
   .products-grid__item {
      width: 50%;
    }
  }
  &__wrapper.col-3 {
    .products-grid__item {
      width: 33.3333%;
    }
  }
  &__wrapper.col-4 {
    .products-grid__item {
      width: 25%;
    }
  }
  &__item {
    width: 33.3333%;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-bottom: 2rem;
    @include md {
      width: 50%;
    }
  }
}
</style>