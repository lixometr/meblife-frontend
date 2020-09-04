<template>
  <AppCollapse :value="isOpen" class="panel-filters__item">
    <template v-slot:trigger>
      <div class="panel-filters__item-name cursor-pointer">
        Сортировать
        <b>{{nowSortTitle}}</b>
      </div>
    </template>
    <template v-slot:content>
      <div class="panel-filters__item-content pl-5 pr-5 pb-4 pt-2">
        <label
          :for="'c-sort-'+sortItem.value"
          class="flex align-center mb-5 cursor-pointer"
          v-for="(sortItem, idx) in sortItems"
          :key="idx"
        >
          <div class="custom-radio">
            <input
              type="radio"
              :id="'c-sort-'+sortItem.value"
              v-model="sortBy"
              :value="sortItem.value"
            />
            <span></span>
          </div>
          <p class="ml-2 text-16">{{sortItem.title}}</p>
        </label>
      </div>
    </template>
  </AppCollapse>
</template>

<script>
export default {
  props: {
    value: String,
    isOpen: Boolean,
  },
  data() {
    return {
      sortItems: [
        {
          value: "cheap",
          title: "Из самых дешевых",
        },
        {
          value: "expansive",
          title: "Из самых дорогих",
        },
        {
          value: "popular",
          title: "Из самых популярных",
        },
        {
          value: "sale",
          title: "Со скидкой",
        },
        {
          value: "new",
          title: "Из самых новых",
        },
      ],
    };
  },
  computed: {
    sortBy: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
    nowSortTitle() {
      const sortItem = this.sortItems.find((item) => item.value === this.value);
      return sortItem.title;
    },
  },
};
</script>

<style lang="scss">
</style>