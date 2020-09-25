<template>
  <div class="menu-categories-list flex h-100">
    <div class="menu-categories-list__content w-100">
      <div
        class="menu-categories-list__items w-100 flex flex-wrap"
        key="noLoading"
      >
        <div
          class="menu-categories-list__item p-2"
          v-for="item in items"
          :key="item._id"
          @click="openCategory(item.slug)"
        >
          <div class="menu-categories-list__item-name cursor-pointer">
            {{ item.name }}
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
 
  methods: {
    openCategory(slug) {
      this.$store.dispatch("modal/close", { name: "modal-menu" });
      this.$router.push(this.$url.category(slug));
    },
  },
};
</script>

<style lang="scss" >
.menu-categories-list {
  padding-top: 2rem;
  &__item {
    width: 25%;
  }
}
</style>