<template>
  <div class="main-page-slider">
    <div class="main-page-slider__wrapper absolute-full">
      <AppSlider
        :items="items"
        height="100%"
        :style="{ height: '100%' }"
        :paginationClass="['hidden']"
        :arrowPrevClass="['hidden']"
        :arrowNextClass="['hidden']"
      >
        <template #slide="{ item }">
          <div class="main-page-slide">
            <div class="main-page-slide__row flex" :class="{'no-image': !(item.image && item.image.url)}">
              <div class="main-page-slide__image position-relative" > 
                <AppImage
                  cover
                  class="w-100 absolute-full"
                  v-bind="item.image"
                />
              </div>
              <div class="main-page-slide__content text-center">
                <div class="main-page-slide__title text-20 text-center">
                  {{ item.title }}
                </div>
                <p class="main-page-slide__sub-title text-14 mt-4">{{ item.sub_title }}</p>
                <div class="mt-4">
                    <nuxt-link class="main-page-slide__link " :to="item.more_btn_url || '#'">{{item.more_btn}}</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </template>
      </AppSlider>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
};
</script>

<style lang="scss">
.main-page-slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  width: 100%;
  height: 100%;
  &__wrapper {
    overflow: hidden;
  }
  .main-page-slide {
    background: #8d909c;
    height: 100%;
    color: $white;
    &__row {
      height: 100%;
      &.no-image {
          .main-page-slide__image {
              display: none;
          }
          .main-page-slide__content {
              width: 100%;
          }
      }
    }
    &__title {
      font-size: 24px;
      line-height: 1.4;
    }
    &__image {
      width: 60%;
    }
    &__link {
        text-decoration: underline;
        font-weight: bold;
        color: $white;
    }
    &__content {
      width: 40%;
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding-left: 3rem;
      padding-right: 3rem;
    }
  }
}
</style>