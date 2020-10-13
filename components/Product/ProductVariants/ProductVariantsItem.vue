<template>
  <div
    class="product-variant"
    :class="{ grid: view === 'grid', slider: view === 'slider' }"
  >
    <div
      class="product-variant__name cursor-pointer pt-3 pb-3 flex justify-between"
      cursor-pointer
      @click="changeView"
    >
      <span> {{ item.name }}</span>
      <svgArrowDown width="20" />
    </div>
    <div class="product-variant__items" ref="variantItems">
      <div
        class="product-variant__item mr-2 mb-2"
        :class="{ 'no-image': !(itm.image && itm.image.url) }"
        v-for="(itm, index) in item.items"
        :key="index"
        @click="chooseVariant(itm)"
      >
        <div
          class="product-variant__item-image"
          v-if="itm.image && itm.image.url"
        >
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
  mounted() {
    // this.$refs.variantItems.style.height = this.$refs.variantItems.offsetHeight + 'px'
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
  watch: {
    async view() {
      const el = this.$refs.variantItems;
      const elHeight = el.offsetHeight;
      if (!this.initialHeight) {
      
        this.initialHeight = elHeight;
        if(!el.style.height) {
          el.style.height = this.initialHeight + 'px'
        }
      }
      if (this.view === "grid") {
        await this.$nextTick();
        const height = el.scrollHeight;
        el.style.height = height + "px";
      } else {
        el.style.height = this.initialHeight + 'px';
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
      // height: 200px;
    }
  }
  &.slider {
    .product-variant__items {
    }
  }
  .product-variant__item-text {
    color: #828282;
  }
  .product-variant__items {
    display: flex;
    align-items: flex-start;
    transition: 0.3s;
    // height: 115px;
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
  .product-variant__item {
    width: 65px;
    margin-right: 0.5rem;
    cursor: pointer;
    flex-shrink: 0;
    img {
      width: 100%;
    }
    &.no-image {
      border: 1px solid $grey;
      border-radius: 4px;
      padding: 0.5rem;
      font-size: 14px;
      width: auto;
    }
  }
}
</style>