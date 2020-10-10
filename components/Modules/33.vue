<template>
  <Module id="33">
    <h2 class="text-24 font-bold uppercase text-center" v-if="title">
      {{ title }}
    </h2>
    <div class="mt-1 text-center" v-if="subTitle">{{ subTitle }}</div>
    <div class="module-33__slider-wrapper mt-6">
      <AppSlider
        class=""
        height="500px"
        :items="moduleImages"
        :arrowPrevClass="['module-33__arrow-prev']"
        :arrowNextClass="['module-33__arrow-next']"
      >
        <template #slide="{ item }">
          <nuxt-link class="module-33__slide" :to="item.more_btn_url || '#'">
            <AppImage cover v-bind="item.image" class="module-33__image" />
            <div class="module-33__slide-texts">
              <div class="module-33__slide-title">{{ item.title }}</div>
              <div class="module-33__slide-btn mt-2" tabindex="0">
                {{ item.more_btn }}
              </div>
            </div>
          </nuxt-link>
        </template>
      </AppSlider>
    </div>
    <div
      class="module-33__grid flex flex-wrap md-column"
      v-if="moduleImages.length > 0"
    ></div>
  </Module>
</template>

<script>
import moduleValidator from "./moduleValidator";
import ModuleMixin from "./ModuleMixin";
export default {
  props: {
    item: moduleValidator,
  },
  mixins: [ModuleMixin],
};
</script>

<style lang="scss">
.module-33 {
  &__arrow-next {
    right: 15px;
  }
  &__arrow-prev {
    left: 15px;
  }
  &__slider-wrapper {
    position: relative;
    overflow: hidden;
  }
  &__slide {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: $white;
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
    &-btn {
      border: 1px solid $white;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 1.5rem;
      transition: $transition;
      background: rgba(255, 255, 255, 0.3);
      &:hover {
        background: $white;
        color: $dark;
      }
    }
    &-title {
      font-size: 2.4rem;
      text-transform: uppercase;
    }
    &-texts {
      position: relative;
      z-index: 5;
    }
  }
  &__image {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
</style>