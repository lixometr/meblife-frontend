<template>
  <div class="category-looks">
    <client-only>
      <div v-masonry transition-duration="0" item-selector=".item" class="masonry-container">
        <div
          class="looks-list__item item"
          v-masonry-tile
          v-for="look in looks"
          :key="look._id"
          @click="openLook(look._id)"
        >
          <img class="looks-list__item-image w-100 h-auto" :src="look.image.url" :alt="look.name" />
          <div class="looks-list__item-btn btn btn-circle btn-blur color-white">
            <svgFullScreen width="26" />
          </div>
        </div>
      </div>
    </client-only>
    <div class="looks-list"></div>
  </div>
</template>

<script>
import svgFullScreen from "@/assets/icons/fullscreen.svg";
export default {
  name: "Categorylooks",
  props: {
    items: Array,
  },
  components: {
    svgFullScreen,
  },
  computed: {
    looks() {
      return [
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=650,height=650,quality=85,format=auto/inspirationImage/inspirationImage20190207-20547-1shf7ze.jpg",
          },
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=650,height=650,quality=85,format=auto/inspirationImage/inspirationImage20190207-20547-c6sv1k.jpg",
          },
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=650,height=650,quality=85,format=auto/inspirationImage/inspirationImage20190207-20547-abh32s.jpg",
          },
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=650,height=650,quality=85,format=auto/inspirationImage/inspirationImage20190207-20547-1etayzn.jpg",
          },
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=650,height=650,quality=85,format=auto/inspirationImage/inspirationImage20190207-20547-1we3x2s.jpg",
          },
        },
      ];
      return this.items;
    },
  },
  methods: {
    openLook(id) {
      // this.$modal.show('panel-look', {
      //   id
      // })
      this.$store.dispatch("modal/open", { name: "panel-look", props: { id } });
    },
  },
};
</script>

<style lang="scss">
.looks-list {
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