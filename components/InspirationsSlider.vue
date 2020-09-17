<template>
  <div class="inspirations-slider" :class="classes">
    <AppSlider
      :items="items"

      :options="{slidesPerView: 'auto',spaceBetween: 20}"
      :slideClass="['inspirations-slider__item ']"
      :sliderClass="['inspirations-slider__slider']"
    >
      <template v-slot:slide="{item}">
        <nuxt-link :to="$url.inspiration(item.slug)" class="d-block inspiration-item w-100 h-100">
          <img
            class="inspiration-item-image size-cover w-100 h-auto"
            :src="item.image.url"
            :alt="item.name"
          />
          <p class="inspiration-item-title color-white text-14">{{item.name}}</p>
          <div class="inspiration-item-btn btn btn-circle btn-blur color-white">
            <svgFullScreen width="26" />
          </div>
        </nuxt-link>
      </template>
    </AppSlider>
  </div>
</template>

<script>
import svgFullScreen from "@/assets/icons/fullscreen.svg";

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: 'md'
    }
  },
  computed: {
      classes() {
      return {
        "inspirations-slider--md": this.size === "md",
        "inspirations-slider--lg": this.size === "lg",
      };
    },
  },
  components: {
    svgFullScreen,
  },
};
</script>

<style lang="scss">
.inspirations-slider {
  &__item {
    width: 400px !important;
    height: 100%;
    @include sm {
      width: 300px !important;
    }
  }
  &.inspirations-sider--md {
    .inspirations-slider__slider {
      height: 300px !important;
    }
  } 
  &.inspirations-slider--lg {
    .inspirations-slider__slider {
      height: 400px !important;
      @include sm {
        height: 300px !important;
      }
    }
    .inspirations-slider__item {
      width: 550px !important;
      @include sm {
        width: 300px !important;
      }
    }
  }
}
</style>