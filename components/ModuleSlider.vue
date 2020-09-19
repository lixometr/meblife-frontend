<template>
  <div class="module-slider position-relative">
    <client-only>
      <div class="overflow-hidden position-relative h-100 module-slider__wrapper">
        <AppSlider
          class="position-absolute w-100"
          :options="sliderOptions"
          :arrowPrevClass="['hidden']"
          :arrowNextClass="['hidden']"
          :slideClass="['slide-width']"
          :paginationClass="['module-slider-pagination']"
          :items="items"
          height="200px"
        >
          <template #slide="{item}">
            <nuxt-link :to="itemLink(item)" class="flex flex-column h-100 bg-pale">
              <div class="p-4 flex-1">
                <div class="h-100 position-relative">
                  <AppImage noBg absoluteFull contain v-bind="itemImage(item)" />
                </div>
              </div>

              <div
                class="text-14 pl-4 pr-4 pt-2 pb-3 truncate white-space-no-wrap text-center font-bold"
              >{{itemName(item)}}</div>
            </nuxt-link>
          </template>
        </AppSlider>
      </div>
      <button
        class="slider-arrow slider-arrow-prev module-slider-arrow-prev"
        :class="'module-slider-arrow-prev-' + _uid"
      >
        <svgArrowRight class="arrow-left" width="35" />
      </button>
      <button
        class="slider-arrow slider-arrow-next module-slider-arrow-next"
        :class="'module-slider-arrow-next-' + _uid"
      >
        <svgArrowRight width="35" />
      </button>
    </client-only>
  </div>
</template>

<script>
import ModuleMixin from "@/components/Modules/ModuleMixin";
import svgArrowRight from "@/assets/icons/arrow-right.svg";

export default {
  props: {
    items: Array,
  },
  components: {
    svgArrowRight,
  },
  mixins: [ModuleMixin],
  computed: {
    sliderOptions() {
      return {
        slidesPerView: "auto",
        spaceBetween: 2,
        navigation: {
          nextEl: ".module-slider-arrow-next-" + this._uid,
          prevEl: ".module-slider-arrow-prev-" + this._uid,
        },
      };
    },
  },
};
</script>

<style lang="scss" >
.module-slider {
  height: 200px;
  padding-left: 60px;
  padding-right: 60px;
  @include md {
    padding-left: 0;
    padding-right: 0;
  }

  &-arrow-next,
  &-arrow-prev {
    background: $grey;
    border: none;
    @include md {
      display: none;
    }
  }
  &-pagination {
    display: none;
    @include md {
      display: block;
    }
  }
}
</style>