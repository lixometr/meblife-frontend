<template>
  <div class="pt-6 pb-6 bg-grey mt-7 mb-5">
    <div class="flex align-center justify-center btn-categories no-scrollbar">
      <nuxt-link
        :to="$url.category(cat.slug)"
        class="btn btn-white btn-md font-bold mr-3"
        :class="{'active cursor-default': cat._id === activeCategory._id}"
        v-for="(cat, idx) in items"
        :key="idx"
      >{{cat.name}}</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    activeCategory: Object,
  },
};
</script>

<style lang="scss" scoped>
</style>