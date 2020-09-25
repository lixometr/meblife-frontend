<template>
  <div class="category-looks position-relative">
    <Loader v-if="isLoading" key="isLoading" />
    <template v-else>
      <LooksArea :items="looks" :info="looksInfo" />
    </template>
  </div>
</template>

<script>
export default {
  name: "Categorylooks",
  inheritAttrs: false,
  props: {
    looks: Array,
    looksInfo: Object,

    isLoading: Boolean,
  },

  computed: {},
  methods: {},
};
</script>

<style lang="scss">
</style>