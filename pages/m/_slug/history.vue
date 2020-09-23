<template>
  <div class="pt-4">
    <div>
      <div class="flex justify-center" v-if="isLoading">
        <Loader />
      </div>
      <AppDescription :text="pageData.history" v-else />
    </div>
  </div>
</template>

<script>
export default {
        inheritAttrs: false,

  props: {
    isLoading: Boolean,
    pageData: Object,
  },
};
</script>

<style lang="scss" >
.manufacturer-info {
  &__image {
    img {
      max-width: 200px;
    }
  }
}
</style>