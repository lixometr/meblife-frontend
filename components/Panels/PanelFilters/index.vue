<template>
  <Panel name="panel-filters" headerTheme="dark" class="panel-filters" @before-open="beforeOpen">
    <template v-slot:title>ФИЛЬТРЫ</template>
    <template v-slot:content>
      <div class="panel-filters__content">
        <AppCollapse>
          <template v-slot:trigger>
            <div class="panel-filters__item-name">Сортировать</div>
          </template>
          <template v-slot:content>
            <div class="panel-filters__item-content pl-5 pr-5 pb-4 pt-2">
              <label for="c-cheap" class="flex align-center mb-5 cursor-pointer">
                <div class="custom-radio">
                  <input type="radio" id="c-cheap" v-model="sortBy" value="cheap" />
                  <span></span>
                </div>
                <p class="ml-2 text-16">Из самых дешевых</p>
              </label>
              <label for="c-expensive" class="flex align-center mb-5 cursor-pointer">
                <div class="custom-radio">
                  <input type="radio" id="c-expensive" v-model="sortBy" value="expensive" />
                  <span></span>
                </div>
                <p class="ml-2 text-16">Из самых дорогих</p>
              </label>
              <label for="c-popular" class="flex align-center mb-5 cursor-pointer">
                <div class="custom-radio">
                  <input type="radio" id="c-popular" v-model="sortBy" value="popular" />
                  <span></span>
                </div>
                <p class="ml-2 text-16">Из самых популярных</p>
              </label>
              <label for="c-sale" class="flex align-center mb-5 cursor-pointer">
                <div class="custom-radio">
                  <input type="radio" id="c-sale" v-model="sortBy" value="sale" />
                  <span></span>
                </div>
                <p class="ml-2 text-16">Со скидкой</p>
              </label>
              <label for="c-new" class="flex align-center mb-5 cursor-pointer">
                <div class="custom-radio">
                  <input type="radio" id="c-new" v-model="sortBy" value="new" />
                  <span></span>
                </div>
                <p class="ml-2 text-16">Из самых новейших</p>
              </label>
            </div>
          </template>
        </AppCollapse>
        <div class="panel-filters__item" v-for="(filterItem, idx) in filterItems" :key="idx">
          <AppCollapse v-if="filterItem.type === 'decimal'" key="isDecimal">
            <template v-slot:trigger>
              <div class="panel-filters__item-name">{{filterItem.name}}</div>
            </template>
            <template v-slot:content>
              <!-- Range Slider -->
              <div class="panel-filters__item-content pl-5 pr-5 pb-4 pt-2">sadasdsd</div>
            </template>
          </AppCollapse>
          <div key="isPanelOpen" @click="openFilterSubPanel" v-else>
            <div class="panel-filters__item-name">{{filterItem.name}}</div>
            <SubFilter />
          </div>
        </div>
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
      params: {},
      sortBy: "",
    };
  },
  computed: {
    filterItems() {
      return this.params.items;
    },
  },
  methods: {
    openFilterSubPanel() {},
    beforeOpen({ params }) {
      const defaultParams = {
        sortOpen: false,
        items: [],
      };
      const newParams = { ...defaultParams, ...params };
      this.params = newParams;
      console.log(newParams);
    },
  },
};
</script>

<style lang="scss">
.panel-filters {
  &__item-name {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid $grey;
    cursor: pointer;
    user-select: none;
  }
  &__item-content {
  }
}
</style>