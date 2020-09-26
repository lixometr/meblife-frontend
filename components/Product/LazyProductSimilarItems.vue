<template>
  <div class="similar-products-slider overflow-hidden" v-if="items.length">
    <div class="container">
      <h3 class="mb-4">Товары похожие на этот</h3>
      <ProductsSlider :items="items" />
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
  computed: {
    currency() {
      return this.$store.getters.currency;
    },
  },
  methods: {
    async loadData() {
      try {
        const data = await this.$api.$get(
          "similarProductItems",
          {
            slug: this.$route.params.slug,
          },
          {
            params: {
              per_page: 20,
            },
          }
        );
        this.items = data || [];
      } catch (err) {
        console.log(err);
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