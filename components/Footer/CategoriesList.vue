<template>
  <div class="mt-3 mb-3 post-page__categories-list text-16">
    <div class="container md-no-gutter">
      <nuxt-link
        class="flex align-center bg-pale pt-3 pb-3 pl-3 pr-3 mb-1"
        v-for="(cat, idx) in items"
        :key="idx"
        :to="cat.slug"
      >
        <img class="no-bg" :src="cat.img" alt />
        <span class="flex-1  text-center font-bold" v-html="cat.text"></span>
        <svgArrowRight class="mr-3" width="30" />
      </nuxt-link>
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
    items() {
      return [
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=50,height=50,quality=85,format=auto/img/icons/meble.jpg",
          text: "Просмотр мебели AZ",
          slug: "#",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=50,height=50,quality=85,format=auto/img/icons/oswietlenie.jpg",
          text: "Мебель AZ",
          slug: "#",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=50,height=50,quality=85,format=auto/img/icons/meble.jpg",
          text: "Просмотр мебели AZ",
          slug: "#",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=50,height=50,quality=85,format=auto/img/icons/oswietlenie.jpg",
          text: "Мебель AZ",
          slug: "#",
        },
      ];
    },
  },
};
</script>

<style lang="scss" >
.post-page__categories-list {
  @include md {
    font-size: $font_14;
  }
  img {
    width: 72px;
    object-fit: scale-down;
    @include md {
      width: 50px;
    }
  }
}
</style>