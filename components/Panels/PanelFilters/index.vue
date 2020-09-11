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
        <FilterSortItem v-model="sortBy" :isOpen="sortOpen" />
        <FilterItem
          v-for="(filterItem, idx) in allFilters"
          :key="idx"
          :item="filterItem"
          :value="values[filterItem.name.slug]"
          @change="changeFilter($event, filterItem)"
        />
        <div class="panel-filters__footer mt-auto border-top border-grey p-4 flex">
          <div class="btn btn-white btn-md mr-2" @click="cancel">Вернуться без изменений</div>
          <div class="btn btn-green btn-md flex-1 font-bold" @click="apply">Применить</div>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import svgCheckmark from "@/assets/icons/checkmark.svg";
import AppCollapse from "@/components/AppCollapse";
import { filtersFromQuery } from "@/helpers/functions";
import _ from "lodash";
export default {
  components: {
    Panel,
    svgCheckmark,
  },
  name: "PanelFilters",
  /*
    values: {
      attr-slug: [attr-value, attr-value]
    }
  */
  data() {
    return {
      sortBy: this.$route.query.sort_by || "popular",
      values: {},
    };
  },
  props: {
    change: Function,
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
    console.log("values", this.values);
  },
  computed: {
    filterItems() {
      return this.items || {};
    },
    attributeFilters() {
      return this.filterItems.attributes || [];
    },
    allFilters() {
      return [...this.staticFilters, ...this.attributeFilters];
    },
    staticFilters() {
      const noAttrs = Object.keys(this.filterItems)
        .filter((prop) => {
          if (prop === "attributes") return false;
          if (_.isEmpty(this.filterItems[prop])) return false;
          return true;
        })
        .map((prop) => {
          return {
            name: {
              name: this.$t("filters." + prop),
              slug: prop,
              attribute_type: prop === "price" ? "decimal" : "values",
            },
            value: this.filterItems[prop],
          };
        });
      return noAttrs || [];
    },
  },
  methods: {
    initFilters() {
      /*
        from
        {price: [200, 300], attributes: [{name: "slug", value: ["slug"]}]}
        
      */
      /*
      to: {
        {
          'attr-name-slug': [{name: "", slug: ""}]
        }
      }
     */
      let normFilterValues = {};
      const filterValues = { ...filtersFromQuery(this.$route.query, false) };
      const attributes = filterValues.attributes;

      attributes.forEach((attr) => {
        const attrInItems = this.attributeFilters.find(
          (attrFilter) => attrFilter.name.slug === attr.name
        );
        if (!attrInItems) return;
        let attrValues;
        if (attrInItems.name.type === "decimal") {
          attrValues = attr.value;
        } else {
          attrValues = attr.value.map((attrVal) => {
            return attrInItems.value.find(
              (attrItemVal) => attrItemVal.slug === attrVal
            );
          });
        }

        normFilterValues[attr.name] = attrValues;
      });
      delete filterValues.attributes;
      Object.keys(filterValues).map((filterSlug) => {
        const paramInItems = this.staticFilters.find(
          (filter) => filter.name.slug === filterSlug
        );
        if (!paramInItems) return;
        let filterValue;
        if (paramInItems.name.attribute_type === "decimal") {
          filterValue = filterValues[filterSlug];
        } else {
          filterValue = filterValues[filterSlug].map((filterVal) => {
            return paramInItems.value.find(
              (filterItemVal) => filterItemVal.slug === filterVal
            );
          });
        }

        normFilterValues[filterSlug] = filterValue;
      });
      normFilterValues = { ...normFilterValues };
      this.values = normFilterValues;
    },
    changeFilter(event, filterItem) {
      const value = event;
      this.$set(this.values, filterItem.name.slug, value);
    },

    apply() {
      console.log(this.values);
      this.change({ values: { ...this.values, sort_by: this.sortBy } });
      this.$emit("close");
    },
    cancel() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.panel-filters {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  &__item {
    border-bottom: 1px solid $grey;
  }
  &__item-name {
    padding: 1.25rem 1.5rem;
    user-select: none;
  }
  &__item-values {
    padding: 0.5rem 1.5rem;
  }
  &__item-value {
    border-radius: 5px;
    padding: 0.25rem 0.5rem;
  }
  &__item-inputs {
    margin-bottom: 1.5rem;
  }
  &__item-input {
    position: relative;
    flex: 1;
    width: auto;
    width: 50%;

    input {
      box-sizing: border-box;
      border-radius: 5px;
      border: 1px solid $grey;
      max-width: 100%;
      display: block;
      outline: none;
    }
    span {
      position: absolute;
      top: 4px;
      left: 8px;
    }
  }
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }
}
</style>