<template>
  <div class="search-input-wrapper">
    <svgSearch class="search-input-icon" width="20" />
    <input
      @keypress.enter="$emit('search')"
      v-model="text"
      class="search-input"
      type="text"
      :placeholder="placeholder"
    />
    <div
      class="search-input-btn btn btn-black shrink-0"
      @click="$emit('search')"
    >
      <svgSearch width="20" />
    </div>
  </div>
</template>

<script>
import svgSearch from "@/assets/icons/search.svg";

export default {
  inheritAttrs: false,
  components: {
    svgSearch,
  },
  props: {
      value: String,
      placeholder: {
          type: String,
          default() {
              return this.$t('searchInputPlaceholder')
          }
      }
  },
  computed: {
      text: {
          get() {
              return this.value
          },
          set(value) {
              this.$emit('input', value)
          }
      }
  }
};
</script>

<style lang="scss" >
.search-input {
  padding-left: 75px;
  padding-right: 1.5rem;
  background-color: $white;
  border: 1px solid $grey;
  border-right: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: block;
  height: 100%;
  flex: 1;
  font-size: $font_16;
  outline: none;
  @include md {
    padding-left: 15px;
  }
}
.search-input-wrapper {
  position: relative;
  height: 70px;
  display: flex;
  align-items: stretch;
}
.search-input-icon {
  position: absolute;
  left: 30px;
  top: 50%;
  transform: translateY(-50%);
  @include md {
    display: none;
  }
}
.search-input-btn {
  width: 70px;
  height: 100%;
  border-radius: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: none;
}
</style>