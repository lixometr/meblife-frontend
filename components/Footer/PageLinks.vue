<template>
  <div class="page-links post-page__page-links">
    <div class="container md-no-gutter">
      <h3 class="text-center uppercase mb-5 text-md-left ">ВАЖНЫЕ ССЫЛКИ</h3>
      <div class="page-links__items">
        <div class="page-links__item bg-pale text-16 mb-1 pl-4" v-for="(link, idx) in links" :key="idx">
          <nuxt-link class="flex pt-4 pb-4" :to="link.url">
            <span class="flex-1 text-center text-md-left " v-html="link.text"></span>
            <svgArrowRight class="mr-3" width="30"/>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import svgArrowRight from "@/assets/icons/arrow-right.svg";
export default {
  components: {
    svgArrowRight,
  },
  computed: {
    links() {
      return [
        {
          url: "#",
          text: "текущие <span class='color-orange'>акции</span>",
        },
        {
          url: "#",
          text: "Гарантия самой низкой цены",
        },
        {
          url: "#",
          text: "Гарантия самой низкой цены",
        },
        {
          url: "#",
          text: "Гарантия самой низкой цены",
        },
        {
          url: "#",
          text: "Гарантия самой низкой цены",
        },
        {
          url: "#",
          text: "Гарантия самой низкой цены",
        },
        {
          url: "#",
          text: "Гарантия самой низкой цены",
        },
        {
          url: "#",
          text: "Гарантия самой низкой цены",
        },
        {
          url: "#",
          text: "Гарантия самой низкой цены",
        },
        {
          url: "#",
          text: "Гарантия самой низкой цены",
        },
        {
          url: "#",
          text: "текущие <span class='color-orange'>акции</span>",
        },
      ];
    },
  },
};
</script>

<style lang="scss">
.page-links {

    h3 {
        @include md {
            padding-left: 1rem;
        }
    }
}
</style>