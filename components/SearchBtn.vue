<template>
  <div class="search" :style="styles">
    <div
      class="search__btn h-100"
      :class="{
        'btn-blur': variant === 'dark',
        'btn-white': variant === 'light',
      }"
    >
      <input type="text" class="search__input" @keypress.enter="search" :placeholder="text" v-model="searchPhrase" />
      <!-- <span class="search__text text-12">{{ text }}</span> -->
      <svgSearch class="search__icon" @click="search"/>
    </div>
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
  data() {
    return {
      searchPhrase: "",
    };
  },
  computed: {
    styles() {
      return {
        width: this.width,
      };
    },
  },
  methods: {
    search() {
      console.log(this.$url.search(this.searchPhrase))
      this.$router.push(this.$url.search(this.searchPhrase))
    },
    openSearchModal() {
      this.$store.dispatch("modal/open", { name: "modal-search" });
    },
  },
};
</script>

<style lang="scss">
.search {
  position: relative;
  height: 30px;
  &__input {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 1;
    border: none;
    border-bottom: 1px solid #000;
    outline: none;
  }

  &__icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    z-index: 5;
    fill: inherit;
    width: 20px;
  }
  &__btn {
    width: 100%;
    text-align: left;
    justify-content: flex-start;
    // padding-right: 80px;
    border-bottom: 1px solid $dark;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    border: none;
    border-bottom: 1px solid $dark;
    background: none;
    color: #4f4f4f;
    font-family: $main_font;
    outline: none;
    cursor: pointer;
    // backdrop-filter: blur(10px);
    // background-color: rgba(255,255,255,0.25);
    &:hover {
      fill: $white;
    }
  }
  &__btn.btn-white {
    // border: 1px solid $grey;
  }
}
</style>