<template>
  <div class="product-looks-slider overflow-hidden" v-if="items.length">
    <div class="container">
      <h3 class="mb-4">{{$t("productLooks")}}</h3>
      <LooksSlider :items="items" size="lg"/>
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

  },
  methods: {
    async loadData() {
      try {
        const data = await this.$api.$get("productLooks", {
          slug: this.$route.params.slug,
        });
        this.items = data || [];
      } catch (err) {
        this.$error(err)
      }
    },
  },
};
</script>

<style lang="scss" >
.product-looks__image-wrapper {
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