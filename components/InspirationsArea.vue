<template>
  <div class="inspirations-area">
    <div v-if="items.length" key="hasItems">
      <div class="inspirations-list">
        <nuxt-link
          :to="$url.inspiration(inspiration.slug)"
          class="inspirations-list__item"
          v-for="inspiration in items"
          :key="inspiration._id"
        >
          <AppImage
            class="inspirations-list__item-image size-cover w-100 h-auto"
            v-bind="inspiration.image"
            :alt="inspiration.name"
          />
          <p class="inspirations-list__item-title color-white text-16">
            {{ inspiration.name }}
          </p>
          <div
            class="inspirations-list__item-btn btn btn-circle btn-blur color-white"
          >
            <svgFullScreen width="26" />
          </div>
        </nuxt-link>
      </div>
      <Pagination class="mt-3" v-model="page" :totalPages="totalPages" />
    </div>
    <div class="text-center" key="noItems" v-else>
      {{$t('noItems')}}
    </div>
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
  created() {
    this.$store.commit("filters/init", this.$route.query);
  },
  data() {
    return {
      page: this.info.nowPage,
    };
  },
  computed: {
    totalPages() {
      return this.info.totalPages;
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

<style lang="scss" >
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