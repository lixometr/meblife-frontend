<template>
  <div class="similar-products-slider overflow-hidden" v-if="items.length">
    <div class="container">
      <h3 class="mb-4">{{ $t("productSimilarInspirations") }}</h3>
      <InspirationsSlider :items="items" size="lg" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  beforeMount() {
    this.loadData();
  },
  methods: {
    async loadData() {
      try {
        const data = await this.$api.$get(
          "productInspirations",
          {
            slug: this.$route.params.slug,
          },
          {
            params: {
              per_page: 20,
            },
          }
        );
        this.items = data.items || [];
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
.similar-products__image-wrapper {
  max-height: 100%;
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>