<template>
  <div class="products-filters">
    <div class="flex flex-wrap">
      <div class="products-filters-delivery flex text-14 mr-3">
        <div class="products-filters-delivery__item products-filters-delivery__item--icon">
          <svgTruck width="20" />
        </div>
        <div
          class="products-filters-delivery__item"
          :class="{'active': delivery === undefined}"
          @click="selectDelivery(undefined)"
        >{{$t('delivery[0]')}}</div>
        <div
          class="products-filters-delivery__item"
          :class="{'active': delivery === '24h'}"
          @click="selectDelivery('24h')"
        >{{$t('delivery[1]')}}</div>
        <div
          class="products-filters-delivery__item"
          :class="{'active': delivery === '14'}"
          @click="selectDelivery('14')"
        >{{$t('delivery[2]')}}</div>
        <div
          class="products-filters-delivery__item"
          :class="{'active': delivery === '30'}"
          @click="selectDelivery('30')"
        >{{$t('delivery[3]')}}</div>
      </div>
      <div class="md-hidden">
        <div class="btn btn-pale btn-md align-center mr-3" @click="openPanelFilter">
          <svgFilter width="25" class="mr-2" />
          {{$t('filtersName')}}
        </div>
        <div class="btn btn-pale btn-md" @click="openPanelSort">
          <svgSort width="25" class="mr-2" />
          {{$t('sort')}}
        </div>
      </div>
      <div class="products-filters-buttons">
        <div class="btn btn-pale btn-md align-center mr-3" @click="openPanelCategories">
          <span class="ml-auto">{{$t('categories')}}</span>
          <svgTriangle width="18" class="ml-auto" />
        </div>
        <div class="btn btn-pale btn-md" @click="openPanelFilter">
          <span class="ml-auto">{{$t('filtersName')}}</span>

          <svgTriangle width="18" class="ml-auto" />
        </div>
      </div>
    </div>
    <div class="flex flex-wrap mt-3" v-if="hasFilters">
      <span class="btn btn-white btn-sm mr-2" v-for="(value, filterSlug, index) in filterValues" :key="index">
        <span class="mr-1">{{$store.getters['filters/getFilterName'](filterSlug)}}:</span>
         <span
          v-for="(filterValue, idx) in value"
          :key="idx"
        >
          <template
            v-if="$store.getters['filters/getFilterType'](filterSlug) === 'decimal'"
          >{{filterValue}}{{ value.length - 1 > idx ? ', ' : ""}}</template>
          <template v-else>{{filterValue.name}}{{ value.length - 1 > idx ? ', ' : ""}}</template>
        </span>
      </span>
      <span class="btn btn-white btn-sm" @click="resetFilters">{{$t('resetFilters')}}</span>
    </div>
  </div>
</template>

<script>
import svgFilter from "@/assets/icons/filter.svg";
import svgSort from "@/assets/icons/sort.svg";
import svgTruck from "@/assets/icons/truck.svg";
import svgTriangle from "@/assets/icons/arrow-down-triangle.svg";
import { filtersFromQuery } from "@/helpers/functions";
import _ from "lodash";
export default {
  props: {
    items: Object,
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
      console.log("changed");
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