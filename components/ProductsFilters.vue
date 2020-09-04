<template>
  <div class="products-filters">
    <div class="flex flex-wrap">
      <div class="products-filters-delivery flex text-14 mr-3">
        <div class="products-filters-delivery__item products-filters-delivery__item--icon">
          <svgTruck width="20" />
        </div>
        <div
          class="products-filters-delivery__item"
          :class="{'active': delivery === ''}"
          @click="selectDelivery('')"
        >все</div>
        <div
          class="products-filters-delivery__item"
          :class="{'active': delivery === '24h'}"
          @click="selectDelivery('24h')"
        >24 ч</div>
        <div
          class="products-filters-delivery__item"
          :class="{'active': delivery === '14'}"
          @click="selectDelivery('14')"
        >до 14 дней</div>
        <div
          class="products-filters-delivery__item"
          :class="{'active': delivery === '30'}"
          @click="selectDelivery('30')"
        >до 30 дней</div>
      </div>
      <div class="md-hidden">
        <div class="btn btn-pale btn-md align-center mr-3" @click="openPanelFilter">
          <svgFilter width="25" class="mr-2" />Фильтр
        </div>
        <div class="btn btn-pale btn-md" @click="openPanelSort">
          <svgSort width="25" class="mr-2" />Сортировка
        </div>
      </div>
      <div class="products-filters-buttons">
        <div class="btn btn-pale btn-md align-center mr-3" @click="openPanelCategories">
          <span class="ml-auto">Категории</span>
          <svgTriangle width="18" class="ml-auto" />
        </div>
        <div class="btn btn-pale btn-md" @click="openPanelFilter">
          <span class="ml-auto">Фильтр</span>

          <svgTriangle width="18" class="ml-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import svgFilter from "@/assets/icons/filter.svg";
import svgSort from "@/assets/icons/sort.svg";
import svgTruck from "@/assets/icons/truck.svg";
import svgTriangle from "@/assets/icons/arrow-down-triangle.svg";
export default {
  props: {
    items: Object,
  },
  data() {
    return {
      delivery: this.$route.query.delivery || '',
    };
  },
  components: {
    svgFilter,
    svgSort,
    svgTruck,
    svgTriangle,
  },
  methods: {
    openPanelFilter() {
      this.$store.dispatch("modal/open", {
        name: "panel-filters",
        props: { items: this.items },
      });
    },
    openPanelSort() {
      this.$store.dispatch("modal/open", {
        name: "panel-filters",
        props: { items: this.items, sortOpen: true },
      });
    },
    openPanelCategories() {
      this.$store.dispatch("modal/open", { name: "panel-categories" });
    },
    selectDelivery(val) {
      this.delivery = val;
      this.$router.push({query: {delivery: val}})
    },
  },
  watch: {
    '$route.query'() {
      console.log('changed')
      this.delivery = this.$route.query.delivery || '';
    }
  }
};
</script>

<style lang="scss">
.products-filters {
  &-delivery {
    @include md {
      width: 100%;
      margin-bottom: 1.5rem;
      margin-right: 0 !important;
    }
    &__item {
      padding-top: 12px;
      padding-bottom: 12px;
      width: 100px;
      background: $pale;
      transition: $transition;
      cursor: pointer;
      text-align: center;
      border-left: 1px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      @include md {
        width: auto;
        flex: 1;
        border-radius: 0;
      }
      &--icon {
        width: 64px;
        @include xl {
          display: none;
        }
        &:hover {
          background: $pale !important;

          cursor: default;
        }
      }
      &:first-child {
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
      }
      &:nth-child(2) {
        @include xl {
          border-top-left-radius: 100px;
          border-bottom-left-radius: 100px;
        }
        @include md {
          border-radius: 0;
        }
      }
      &:last-child {
        border-top-right-radius: 100px;
        border-bottom-right-radius: 100px;
        @include md {
          border-radius: 0;
        }
      }
      &:hover,
      &.active {
        background: $grey;
      }
    }
  }
  &-buttons {
    display: none;
    width: 100%;
    @include md {
      display: flex;
    }
    .btn {
      flex: 1;
    }
  }
}
</style>