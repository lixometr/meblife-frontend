<template>
  <div>
    <div class="language-switcher position-relative user-select-none text-12">
      <div
        class="language-switcher__trigger w-100 pt-2 pb-2 cursor-pointer flex align-center text-left"
        :class="{
          'btn-white': variant === 'dark',
          'btn-white border border-black': variant === 'light',
        }"
        @click="toggle"
      >
        <svgUnion width="12" class="mr-1" />
        {{ activelanguage.name }}
        <svgArrowDown width="15" :class="{ 'rotate-180': isOpen }" />
      </div>
      <div class="language-switcher__list select-list bg-white" v-if="isOpen">
        <div
          class="cursor-pointer p-2  language-switcher__item"
          v-for="lang in languages"
          :key="lang._id"
          @click="switchLanguage(lang.slug)"
        >
          {{ lang.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import svgArrowDown from "@/assets/icons/arrow-down-sm.svg";
import svgUnion from "@/assets/icons/union.svg";

export default {
  props: {
    variant: String,
  },
  data() {
    return {
      isOpen: false,
    };
  },
  components: {
    svgArrowDown,
    svgUnion,
  },
  computed: {
    languages() {
      return this.$store.getters.languages;
    },
    activelanguage() {
      return this.$store.getters.activeLanguage || {};
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
    async switchLanguage(slug) {
      this.$store.dispatch("i18n/setLocale", slug);
      this.$router.push(`/`);
      this.isOpen = false;
    },
  },
};
</script>

<style lang="scss">
.language-switcher {
  min-width: 60px;
  &__item {
    background: $white;
    color: $black;
    &:hover {
      background: $black;
      color: $white;
    }
  }
  &__list {

  }
}
</style>