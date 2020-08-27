<template>
  <div class="products-filters">
    <div class="flex flex-wrap">
      <div class="products-filters-delivery flex text-14 mr-3">
        <div class="products-filters-delivery__item" :class="{'active': deliveryActive === 1}">все</div>
        <div class="products-filters-delivery__item">24 ч</div>
        <div class="products-filters-delivery__item">до 14 дней</div>
        <div class="products-filters-delivery__item">до 30 дней</div>
      </div>
      <div class="btn btn-pale btn-md align-center mr-3">
        <svgFilter width="25" class="mr-2" />Фильтр
      </div>
      <div class="btn btn-pale btn-md">
        <svgSort width="25" class="mr-2" />Сортировка
      </div>
    </div>
  </div>
</template>

<script>
import svgFilter from "@/assets/icons/filter.svg";
import svgSort from "@/assets/icons/sort.svg";
export default {
  data() {
    return {
      deliveryActive: 1,
    };
  },
  components: {
    svgFilter,
    svgSort,
  },
};
</script>

<style lang="scss">
.products-filters {
  &-delivery {
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
      &:first-child {
        border-top-left-radius: 100px;
        border-bottom-left-radius: 100px;
      }
      &:last-child {
        border-top-right-radius: 100px;
        border-bottom-right-radius: 100px;
      }
      &:hover,
      &.active {
        background: $grey;
      }
    }
  }
}
</style>