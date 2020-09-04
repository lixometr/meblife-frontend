<template>
  <client-only>
    <modal
      :name="'slider-modal'"
      :transition="'fade'"
      :classes="['slider-modal__modal']"
      class="slider-modal"
      height="100%"
      width="100%"
      :adaptive="true"
      @before-open="beforeModalOpen"
    >
      <div
        class="slider-modal-close flex align-center justify-center btn btn-circle btn-white"
        @click="close"
      >
        <svgClose width="30" />
      </div>

      <AppSlider
        class="slider-modal-slider"
        height="100%"
        :items="slideItems"
        :options="{
            initialSlide
        }"
        :arrowPrevClass="['slider-modal__arrow-prev']"
        :arrowNextClass="['slider-modal__arrow-next']"
        :paginationClass="['slider-modal-pagination']"
      >
        <template v-slot:slide="{item}">
          <div class="slider-modal-slider__item cursor-pointer">
            <img :src="item.url" :alt="item.alt" />
          </div>
        </template>
      </AppSlider>
    </modal>
  </client-only>
</template>

<script>
import svgClose from "@/assets/icons/close.svg";
import AppSlider from "@/components/AppSlider";
// open this.$modal.show('slider-modal', {items: [{url: "image"}]})
export default {
  components: {
    svgClose,
    AppSlider,
  },
  props: {
    items: Array,
  },

  data() {
    return {
      slideItems: this.items,
      initialSlide: 0,
    };
  },
  methods: {
    close() {
      this.$modal.hide("slider-modal");
    },
    beforeModalOpen({ params }) {
      this.slideItems = params.items;
      this.initialSlide = params.initialSlide;
    },
  },
};
</script>

<style lang="scss">
.slider-modal {
  &__modal {
    background: linear-gradient(
      150deg,
      rgb(50, 50, 50) 0%,
      rgb(140, 140, 140) 100%
    );
  }
  &:hover {
    .slider-modal-close {
      opacity: 1;
    }
  }
  &-close {
    position: absolute;
    top: 15px;
    right: 15px;
    opacity: 0;
    transition: $transition;
    z-index: 30;
  }
  &-slider {
    position: absolute;
    width: 100%;
    height: 100%;
    .swiper-container {
      height: 100%;
    }
    &__item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  }
  .slider-modal-pagination {
    bottom: 30px !important;
    left: 50%;
    transform: translateX(-50%);
  }
  .slider-modal__arrow-next {
    right: 30px;
  }
  .slider-modal__arrow-prev {
    left: 30px;
  }
}
</style>