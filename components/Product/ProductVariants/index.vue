<template>
  <div class="product-variants">
    <ProductVariantsItem  v-for="(variant, idx) in items" :key="idx" :item="variant"/>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
  data() {
    return {

    }
  },
  components: {
  },
  methods: {
    chooseItem(item) {

    },
    changeView() {
      
    }
  }
};
</script>

<style lang="scss">
.product-variants {
    
}
</style>