<template>
  <div
    class="similar-categories-slider overflow-hidden mt-7"
    v-if="items.length"
  >
    <div class="container">
      <h3 class="mb-4 uppercase">Соответствующие категории</h3>
      <AppSlider
        :items="items"
        :options="{ slidesPerView: 'auto', spaceBetween: 20 }"
        :slideClass="['slide-width']"
        :height="'400px'"
      >
        <template v-slot:slide="{ item }">
          <nuxt-link
            :to="$url.category(item.slug)"
            class="shadow flex flex-column rounded-10 p-4 h-100"
          >
            <div class="flex-1 flex align-center">
              <AppImage v-bind="item.image" />
            </div>
            <p class="font-bold truncate white-space-no-wrap">
              {{ item.name }}
            </p>
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
  methods: {
    async loadData() {
      try {
        const data = await this.$api.$get(
          "similarProductCategories",
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

<style lang="scss" scoped>
</style>