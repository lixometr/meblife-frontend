<template>
  <div class="app-slider">
    <client-only>
      <swiper
        class="custom-slider"
        :options="sliderOptions"
        :class="sliderClass"
        :style="{height: height}"
      >
        <swiper-slide v-for="(item, idx) in items" :key="idx" :class="slideClass">
          <slot name="slide" :item="item" :idx="idx">
            <img :src="item.url" alt class="size-contain no-bg" />
          </slot>
        </swiper-slide>
        <div
          :class="paginationClasses"
          class="swiper-pagination custom-pagination"
          ref="pagination"
          slot="pagination"
        ></div>
        <button :class="arrowPrevClasses" class="slider-arrow slider-arrow-prev" slot="button-prev">
          <svgArrowRight class="arrow-left" width="35" />
        </button>
        <button :class="arrowNextClasses" class="slider-arrow slider-arrow-next" slot="button-next">
          <svgArrowRight width="35" />
        </button>
      </swiper>
    </client-only>
  </div>
</template>

<script>
import svgArrowRight from "@/assets/icons/arrow-right.svg";

export default {
  props: {
    items: Array,
    options: Object,
    slideClass: [Array, Object],
    sliderClass: [Array, Object],
    height: {
      type: String,
      default: '400px',
    },
    arrowPrevClass: {
      type: Array,
      default: () => [],
    },
    arrowNextClass: {
      type: Array,
      default: () => [],
    },
    paginationClass: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    svgArrowRight,
  },
  computed: {
    arrowPrevClasses() {
      return ["swiper-arrow-prev-" + this._uid, ...this.arrowPrevClass];
    },
    arrowNextClasses() {
      return ["swiper-arrow-next-" + this._uid, ...this.arrowNextClass];
    },
    paginationClasses() {
      return ["swiper-pagination-" + this._uid, ...this.paginationClass];
    },
    sliderOptions() {
      const defaultSettings = {
        slidesPerView: 1,
        spaceBetween: 100,
        height: this.height,
        watchOverflow: true,
        pagination: {
          el: ".swiper-pagination-" + this._uid,
          type: "bullets",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: ".swiper-arrow-next-" + this._uid,
          prevEl: ".swiper-arrow-prev-" + this._uid,
        },
      };
      return { ...defaultSettings, ...this.options };
    },
  },
};
</script>

<style lang="scss">
</style>