<template>
  <div class="bg-gallery position-relative">
    <div class="bg-gallery__images flex justify-center overflow-hidden">
      <img :src="image" alt v-for="(image, idx) in images" :key="idx"  class="mr-2 shrink-0"/>
    </div>
    <div class="bg-gallery__content position-absolute transform-center flex align-center rounded-10 bg-white z-1 p-5">
      <div class="bg-gallery__texts ">
        <div class="font-bold text-20 font-second mb-1">{{title}}</div>
        <div class="text-14">{{subTitle}}</div>
      </div>
      <nuxt-link :to="url" class="btn btn-circle btn-red btn-circle-lg color-white "><svgArrowRight width="30"/></nuxt-link>
    </div>
  </div>
</template>

<script>
import svgArrowRight from "@/assets/icons/arrow-right.svg";
export default {
    components: {
        svgArrowRight
    },
  props: {
    images: Array,
    title: String,
    subTitle: String,
    url: String,
  },
};
</script>

<style lang="scss">
.bg-gallery {
    &__images {
        img {
            width: 360px;
        }
    }
    .bg-gallery__content {
        width: 100%;
        max-width: 300px;
    }
}
</style>