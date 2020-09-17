<template>
  <div class="container pb-8" v-if="show">
    <div class="flex md-column mb-5" style="height: 500px" v-if="imageLeft || imageRight">
      <div class="flex-1 position-relative mr-3">
        <img class="absolute-full size-cover" :src="imageLeft" alt />
      </div>
      <div class="flex-1 position-relative">
        <img class="absolute-full size-cover" :src="imageRight" alt />
      </div>
    </div>
    <div class="mb-8">
      <h4 class="text-right text-md-center mt-3 mb-1" v-if="title">{{title}}</h4>
      <div v-html="text" v-if="text"></div>
    </div>
    <InspirationSlider :items="products" v-if="products.length > 0" />
  </div>
</template>

<script>
export default {
    props: {
        title: String,
        text: String,
        imageLeft: String,
        imageRight: String,
        products: {
          type: Array,
          default: () => ([])
        }
    },
    computed: {
      show() {
        return this.title || this.text || this.imageLeft || this.imageRight || this.products.length > 0
      }
    }
};
</script>

<style lang="scss" >
</style>