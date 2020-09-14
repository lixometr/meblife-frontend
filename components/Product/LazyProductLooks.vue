<template>
  <div class="product-looks-slider overflow-hidden" v-if="items.length">
    <div class="container">
      <h3 class="mb-4">Товары похожие на этот</h3>
      <AppSlider
        :items="items"
        :options="{slidesPerView: 'auto',spaceBetween: 20}"
        :slideClass="['slide-width']"
        :height="'400px'"
      >
        <template v-slot:slide="{item}">
          <nuxt-link
            :to="$url.product(item.slug)"
            class="shadow flex flex-column rounded-10 p-4 h-100"
          >
            <div class="flex-1 text-center product-looks__image-wrapper">
              <img class="size-contain" :src="item.default_image && item.default_image.url" alt />
            </div>
            <div class="shrink-0">
              <p class="font-bold truncate white-space-no-wrap">{{item.name}}</p>
              <p class="text-14">{{item.price}} {{currency}}</p>
              <p class="color-green">{{item.delivery}}</p>
            </div>
          </nuxt-link>
        </template>
      </AppSlider>
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
  return this.$store.getters.currency
}
  },
  methods: {
    async loadData() {
      try {
        const data = await this.$api.$get("similarProductItems", {
          slug: this.$route.params.slug,
        });
        this.items = data || [];
      } catch (err) {
        console.log(err);
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