<template>
  <div class="pt-4">
    <div class="flex justify-center" key="isLoading" v-if="isLoading">
      <Loader />
    </div>

    <div key="noLoadiner" v-else>
      <h4
        class="text-center font-bold mb-4"
      >{{$t('categories')}} {{$t('in')}} "{{pageData.manufacturerName}}"</h4>
      <CategoryGrid :items="items" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
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