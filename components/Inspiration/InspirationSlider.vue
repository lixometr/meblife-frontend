<template>
  <div class="inspiration-products-slider">
    <ProductsSlider :items="items" />
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
};
</script>

<style lang="scss" >
</style>