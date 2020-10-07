<template>
  <div class="products-filters">
    <div class="flex flex-wrap">
      <div
        class="btn md-hidden btn-white btn-md align-center mr-3"
        @click="openPanelCategories"
      >
        <span class="ml-auto">{{ $t("categories") }}</span>
        <svgTriangle width="18" class="ml-auto" />
      </div>
      <div class="products-filters-delivery flex text-14 mr-3">
        <div
          class="products-filters-delivery__item products-filters-delivery__item--icon"
        >
          <svgTruck width="20" />
        </div>
        <div
          class="products-filters-delivery__item"
          :class="{ active: delivery === undefined }"
          @click="selectDelivery(undefined)"
        >
          {{ $t("delivery[0]") }}
        </div>
        <div
          class="products-filters-delivery__item"
          :class="{ active: delivery === '24h' }"
          @click="selectDelivery('24h')"
        >
          {{ $t("delivery[1]") }}
        </div>
        <div
          class="products-filters-delivery__item"
          :class="{ active: delivery === '14' }"
          @click="selectDelivery('14')"
        >
          {{ $t("delivery[2]") }}
        </div>
        <div
          class="products-filters-delivery__item"
          :class="{ active: delivery === '30' }"
          @click="selectDelivery('30')"
        >
          {{ $t("delivery[3]") }}
        </div>
      </div>
      <div class="md-hidden flex flex-1">
        <div
          class="btn btn-white btn-md align-center mr-3"
          @click="openPanelFilter"
        >
          <svgFilter width="25" class="mr-2" />
          {{ $t("filtersName") }}
        </div>
        <div class="btn btn-white btn-md" @click="openPanelSort">
          <svgSort width="25" class="mr-2" />
          {{ $t("sort") }}
        </div>
        <LayoutSwitcher class="products-filters__layout-switcher" @click="switchLayout" />
      </div>
      <div class="products-filters-buttons">
        <div
          class="btn btn-white btn-md align-center mr-3"
          @click="openPanelCategories"
        >
          <span class="ml-auto">{{ $t("categories") }}</span>
          <svgTriangle width="18" class="ml-auto" />
        </div>
        <div class="btn btn-white btn-md" @click="openPanelFilter">
          <span class="ml-auto">{{ $t("filtersName") }}</span>

          <svgTriangle width="18" class="ml-auto" />
        </div>
      </div>
    </div>
    <div class="flex flex-wrap mt-3" v-if="hasFilters">
      <span
        class="btn btn-white btn-sm mr-2"
        v-for="(value, filterSlug, index) in filterValues"
        :key="index"
      >
        <span class="mr-1"
          >{{ $store.getters["filters/getFilterName"](filterSlug) }}:</span
        >
        <span v-for="(filterValue, idx) in value" :key="idx">
          <template
            v-if="
              $store.getters['filters/getFilterType'](filterSlug) === 'decimal'
            "
            >{{ filterValue }}{{ value.length - 1 > idx ? ", " : "" }}</template
          >
          <template v-else
            >{{ filterValue.name
            }}{{ value.length - 1 > idx ? ", " : "" }}</template
          >
        </span>
        <svgClose class="ml-1" width="20" @click="removeFilter(filterSlug)" />
      </span>
      <span class="btn btn-white btn-sm" @click="resetFilters">{{
        $t("resetFilters")
      }}</span>
    </div>
  </div>
</template>

<script>
import svgFilter from "@/assets/icons/filter.svg";
import svgSort from "@/assets/icons/sort.svg";
import svgTruck from "@/assets/icons/truck.svg";
import svgTriangle from "@/assets/icons/arrow-down-triangle.svg";
import svgClose from "@/assets/icons/close.svg";
import { filtersFromQuery } from "@/helpers/functions";
import _ from "lodash";
export default {
  props: {
    items: Object,
    layout: Number,
  },
  data() {
    return {
      // delivery: this.$route.query.delivery || undefined ,
      // filterValues: this.$route.query,
    };
  },
  components: {
    svgFilter,
    svgSort,
    svgTruck,
    svgTriangle,
    svgClose,
  },
  computed: {
    hasFilters() {
      return !_.isEmpty(this.filterValues);
    },
    delivery() {
      return this.$store.getters["filters/delivery"];
    },
    filterValues() {
      return this.$store.getters["filters/valueObj"];
    },
  },

  methods: {
    switchLayout() {
      console.log(1)
      const layouts = [2, 3, 4];
      let newLayout = this.layout + 1;
      if (!layouts.includes(newLayout)) {
        newLayout = layouts[0];
      }
      this.$emit("update:layout", newLayout);
    },
    openPanelFilter() {
      this.$store.dispatch("modal/open", {
        name: "panel-filters",
        props: { items: this.items, change: this.onFilterChange },
      });
    },
    openPanelSort() {
      this.$store.dispatch("modal/open", {
        name: "panel-filters",
        props: {
          items: this.items,
          sortOpen: true,
          change: this.onFilterChange,
        },
      });
    },

    openPanelCategories() {
      this.$store.dispatch("modal/open", { name: "panel-categories" });
    },
    resetFilters() {
      this.$store.commit("filters/resetFilterValues");
      this.$store.commit("filters/setDelivery", undefined);
      this.setQueryUrl();
    },
    removeFilter(filterSlug) {
      this.$store.commit("filters/removeFilter", filterSlug);
      this.setQueryUrl();
    },
    onFilterChange({ values }) {
      this.setQueryUrl();
    },
    selectDelivery(val) {
      this.$store.commit("filters/setDelivery", val);
      this.setQueryUrl();
    },
    setQueryUrl() {
      this.$router.push({
        query: { ...this.$store.getters["filters/filtersToQuery"] },
      });
    },
  },
  watch: {
    "$route.query"() {
      this.$store.commit("filters/init", this.$route.query);
      // this.delivery = this.$route.query.delivery || undefined;
    },
  },
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
      background: $white;
      transition: $transition;
      cursor: pointer;
      text-align: center;
      border: 1px solid $grey;
      border-left: none;
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
        border-left: 1px solid $grey;
        // border-top-left-radius: 100px;
        // border-bottom-left-radius: 100px;
      }
      &:nth-child(2) {
        @include xl {
          // border-top-left-radius: 100px;
          // border-bottom-left-radius: 100px;
        }
        @include md {
          border-radius: 0;
        }
      }
      &:last-child {
        // border-top-right-radius: 100px;
        // border-bottom-right-radius: 100px;
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
  &__layout-switcher {
    padding: 0;
    height: 100%;
    width: 50px;
    margin-left: 15px;
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