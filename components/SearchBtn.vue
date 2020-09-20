<template>
  <div class="search" :style="styles">
    <button
      class="search__btn btn btn-md"
      :class="{'btn-blur': variant === 'dark', 'btn-white': variant === 'light'}"
      @click="openSearchModal"
    >
      <span class="search__text font-bold text-12">{{text}}</span>
      <svgSearch class="search__icon" />
    </button>
  </div>
</template>

<script>
import svgSearch from "@/assets/icons/search.svg";
export default {
  props: {
    text: {
      type: String,
      default: "Поиск",
    },
    width: String,
    variant: String,
  },
  components: {
    svgSearch,
  },
  computed: {
    styles() {
      return {
        width: this.width,
      };
    },
  },
  methods: {
    openSearchModal() {
      this.$store.dispatch("modal/open", { name: "modal-search" });
    },
  },
};
</script>

<style lang="scss">
.search {
  position: relative;

  &__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 20px;
    fill: inherit;
    width: 20px;
  }
  &__btn.btn {
    width: 100%;
    text-align: left;
    justify-content: flex-start;
    padding-right: 80px;
    // backdrop-filter: blur(10px);
    // background-color: rgba(255,255,255,0.25);
    &:hover {
      fill: $white;
    }
  }
  &__btn.btn-white {
    border: 1px solid $grey;
  }
}
</style>