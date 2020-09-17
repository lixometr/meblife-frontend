<template>
  <div class="looks-slider" :class="classes">
    <AppSlider
      class
      :items="items"
      :options="{slidesPerView: 'auto',spaceBetween: 20}"
      :slideClass="['looks-slider__item ']"
      :sliderClass="['looks-slider__slider']"
    >
      <template v-slot:slide="{item}">
        <div class="d-block inspiration-item w-100 h-100" @click="openLook(item._id)">
          <img
            class="inspiration-item-image size-cover w-100 h-auto"
            :src="item.image.url"
            :alt="item.name"
          />
          <div class="inspiration-item-btn btn btn-circle btn-blur color-white">
            <svgFullScreen width="26" />
          </div>
        </div>
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
    // md, lg
    size: {
      type: String,
      default: "md",
    },
  },
  components: {
    svgFullScreen,
  },
  computed: {
    classes() {
      return {
        "looks-slider--md": this.size === "md",
        "looks-slider--lg": this.size === "lg",
      };
    },

  },
  methods: {
    openLook(id) {
      this.$store.dispatch("modal/open", { name: "panel-look", props: { id } });
    },
  },
};
</script>

<style lang="scss">
.looks-slider {
  &__item {
    width: 400px !important;
    height: 100%;
    @include sm {
      width: 300px !important;
    }
  }
  &.looks-sider--md {
    .looks-slider__slider {
      height: 300px !important;
    }
  } 
  &.looks-slider--lg {
    .looks-slider__slider {
      height: 400px !important;
      @include sm {
        height: 300px !important;
      }
    }
    .looks-slider__item {
      width: 550px !important;
      @include sm {
        width: 300px !important;
      }
    }
  }
}
</style>