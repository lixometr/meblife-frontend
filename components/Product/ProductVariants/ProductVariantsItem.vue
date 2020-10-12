<template>
  <div
    class="product-variant"
    :class="{ grid: view === 'grid', slider: view === 'slider' }"
  >
    <div class="product-variant__name cursor-pointer pt-3 pb-3 flex justify-between" cursor-pointer @click="changeView" > 
      <span> {{ item.name }}</span>
      <svgArrowDown  width="20" />
    </div>
    <div class="product-variant__items ">
      <div
        class="product-variant__item mr-2 mb-2"
        v-for="(itm, index) in item.items"
        :key="index"
        @click="chooseVariant(itm)"
      >
        <div class="product-variant__item-image">
          <AppImage v-bind="itm.image" />
        </div>
        <div class="product-variant__item-text text-12">
          {{ itm.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import svgArrowDown from "@/assets/icons/arrow-down-sm.svg";

export default {
  props: {
    item: Object,
  },
  components: {
    svgArrowDown,
  },
  data() {
    return {
      view: "slider",
    };
  },
  methods: {
    chooseVariant(item) {},
    changeView() {
      if (this.view === "slider") {
        this.view = "grid";
      } else {
        this.view = "slider";
      }
    },
  },
};
</script>

<style lang="scss">
.product-variant {
  &.grid {
    .product-variant__items {
      display: flex;
      flex-wrap: wrap;
    }
  }
  &.slider {
    .product-variant__items {
      overflow: auto;
      -ms-overflow-style: none; /* IE and Edge */
      scrollbar-width: none;
      &::-webkit-scrollbar {
        width: 0;
        display: none;
        overflow: -moz-scrollbars-none;
        -ms-overflow-style: none;
      }
    }
  }
  .product-variant__item-text {
    color: #828282;
  }
  .product-variant__items {
    display: flex;
  }
  .product-variant__item {
    width: 56px;
    margin-right: 0.5rem;
    cursor: pointer;
    flex-shrink: 0;
  }
}
</style>