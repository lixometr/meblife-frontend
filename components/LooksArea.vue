<template>
  <div>
    <client-only>
      <div v-masonry transition-duration="0" item-selector=".item" class="masonry-container">
        <div
          class="looks-list__item item"
          v-masonry-tile
          v-for="look in items"
          :key="look._id"
          @click="openLook(look._id)"
        >
          <AppImage
            data-not-lazy
            class="looks-list__item-image w-100 h-auto"
            v-bind="look.image"
            :alt="look.name"
          />
          <div class="looks-list__item-btn btn btn-circle btn-blur color-white">
            <svgFullScreen width="26" />
          </div>
        </div>
      </div>
    </client-only>
    <Pagination class="mt-3" v-model="page" :totalPages="totalPages" />
  </div>
</template>

<script>
import svgFullScreen from "@/assets/icons/fullscreen.svg";

export default {
  props: {
    items: Array,
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    svgFullScreen,
  },
  data() {
    return {
      page: this.info.nowPage,
    };
  },
  created() {
    this.$store.commit("filters/init", this.$route.query);
  },

  computed: {
    totalPages() {
      return this.info.totalPages;
    },
  },
  methods: {
    openLook(id) {
      this.$store.dispatch("modal/open", { name: "panel-look", props: { id } });
    },
  },
  watch: {
    page() {
      this.$store.commit("filters/setPage", this.page);
      this.$store.dispatch("filters/apply");
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