<template>
  <div class="category-inspirations">
    <div class="inspirations-list">
      <nuxt-link
        :to="$url.inspiration(inspiration.slug)"
        class="inspirations-list__item"
        v-for="inspiration in inspirations"
        :key="inspiration._id"
      >
        <img
          class="inspirations-list__item-image size-cover w-100 h-auto"
          :src="inspiration.image.url"
          :alt="inspiration.name"
        />
        <p class="inspirations-list__item-title color-white text-16">{{inspiration.name}}</p>
        <div class="inspirations-list__item-btn btn btn-circle  btn-blur color-white">
          <svgFullScreen width="26" />
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import svgFullScreen from "@/assets/icons/fullscreen.svg";
export default {
  name: "CategoryInspirations",
  props: {
    items: Array,
  },
  components: {
    svgFullScreen,
  },
  computed: {
    inspirations() {
      return [
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=650,height=650,quality=85,format=auto/inspiration-7c43aab387370a4f97fe6893e64d4a934574cd6d.jpg",
          },
          name: "Some inspiration",
          slug: "test",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=650,height=650,quality=85,format=auto/inspiration-7c43aab387370a4f97fe6893e64d4a934574cd6d.jpg",
          },
          name: "Some inspiration sad sad sad ad asdsasadasd",
          slug: "test",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=650,height=650,quality=85,format=auto/inspiration-0c4c888d1c5e7601535de093a1f622494b8f560e.jpg",
          },
          name: "Some inspiration",
          slug: "test",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=650,height=650,quality=85,format=auto/inspiration-7c43aab387370a4f97fe6893e64d4a934574cd6d.jpg",
          },
          name: "Some inspiration",
          slug: "test",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=650,height=650,quality=85,format=auto/inspiration-7c43aab387370a4f97fe6893e64d4a934574cd6d.jpg",
          },
          name: "Some inspiration",
          slug: "test",
        },
      ];
      return this.items;
    },
  },
};
</script>

<style lang="scss">
.inspirations-list {
  display: flex;
  flex-wrap: wrap;
  &__item {
    width: calc(100% / 3 - 15px);
    min-height: 150px;
    margin-right: 15px;
    margin-bottom: 15px;
    position: relative;
    font-size: 0;
    @include xl {
        width: calc(50% - 15px);
    }
    @include md {
        margin-right: 0;

        width: 100%;
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      display: block;
      background: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.75) -35%,
        transparent 50%
      );
      z-index: 1;
    }
    &-title {
      position: absolute;
      bottom: 20px;
      padding-left: 1.25rem;
      padding-right: 4.5rem;
      z-index: 5;
    }
    &-btn {
      position: absolute !important;
      bottom: 16px;
      right: 16px;
      z-index: 5;
      width: 58px;
      height: 58px;
    }
  }
}
</style>