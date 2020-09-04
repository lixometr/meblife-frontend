<template>
  <Panel
    name="panel-filters"
    headerTheme="dark"
    class="panel-filters"
    :isStatic="false"
    @close="$emit('close')"
  >
    <template v-slot:title>ФИЛЬТРЫ</template>
    <template v-slot:content>
      <div class="panel-filters__content">
        <FilterSortItem v-model="sortBy" :isOpen="sortOpen"/>
        <FilterItem v-for="(filterItem, idx) in attributeFilters" :key="idx" :item="filterItem" @change="changeFilter($event, filterItem)"/>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import svgCheckmark from "@/assets/icons/checkmark.svg";
import AppCollapse from "@/components/AppCollapse";


export default {
  components: {
    Panel,
    svgCheckmark,
  },
  data() {
    return {
      sortBy: "popular",
      filters: {},
      priceFilter: [0, 100],
      values: {},
     
    };
  },
  props: {
    items: {
      type: Object,
      default: () => ({}),
    },
    sortOpen: {
      type: Boolean,
      default: false,
    },
  },
  beforeMount() {
    this.initFilters();
  },
  computed: {

    filterItems() {
      return this.items || {};
    },
    attributeFilters() {
      return this.filterItems.attributes;
    },
    staticFilters() {
      return [
        this.filterItems.price,
        this.filterItems.manufacturer,
        this.filterItems.labels,
      ];
    },
  },
  methods: {
    initFilters() {
      this.values = this.$route.query;
    },
    openFilterSubPanel() {},
  },
  changeFilter(event, filterItem) {
    const value = event;
    this.$set(this.values, filterItem.name.slug, value);
  },
};
</script>

<style lang="scss">
.panel-filters {
  &__item {
    border-bottom: 1px solid $grey;
  }
  &__item-name {
    padding: 1.25rem 1.5rem;
    cursor: pointer;
    user-select: none;
  }
  &__item-content {
  }
}
</style>