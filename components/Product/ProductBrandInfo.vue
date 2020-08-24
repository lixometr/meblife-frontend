<template>
  <div class="product-brand-info">
    <div class="flex justify-center">
      <img :src="img" alt="brand" />
    </div>
    <div class="product-brand-slider">
        <AppSlider :items="brandInspirations">
            <template v-slot:slide="{item}">
                <div class="product-brand__slide">
                    
                </div>
            </template>
        </AppSlider>
    </div>
  </div>
</template>

<script>
import AppSlider from "@/components/AppSlider";
export default {
  props: {
    id: String,
    img: String,
  },
  async beforeMount() {
    // Запрос на бренд
  },
  computed: {
      brandInspirations() {
          return [
              {
                  img: ''
              }
          ]
      }
  }
};
</script>

<style lang="scss">
</style>