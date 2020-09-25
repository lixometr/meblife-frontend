<template>
  <div class="menu-categories-grid flex h-100">
    <div class="menu-categories-grid__content w-100">
      <div class="menu-categories-grid__items w-100 flex flex-wrap">
        <div
          class="menu-categories-grid__item"
          v-for="item in items"
          :key="item._id"
          @click="openCategory(item.slug)"
        >
          <div
            class="cursor-pointer flex flex-column align-center p-4 rounded-10 shadow bg-white h-100"
          >
            <div
              class="menu-categories-grid__item-image position-relative mb-2 flex-1 w-100"
            >
              <AppImage v-bind="item.image" contain absoluteFull />
            </div>
            <div
              class="menu-categories-grid__item-name font-bold text-14 text-center uppercase"
            >
              <span class="truncate white-space-no-wrap"> {{ item.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    category: Object,
  },
  components: {},
  data() {
    return {};
  },
  async created() {},
  methods: {
    openCategory(slug) {
      this.$store.dispatch("modal/close", { name: "modal-menu" });
      this.$router.push(this.$url.category(slug));
    },
  },
};
</script>

<style lang="scss" >
.menu-categories-grid {
  padding-top: 1.5rem;

  &__items {
    margin-left: -1rem;
    margin-right: -1rem;
  }
  &__item {
    height: 350px;
    padding: 1rem;
    width: 25%;
  }
}
</style>