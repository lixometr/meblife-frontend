<template>
  <div class="category-grid">
    <div class="category-grid__items flex flex-wrap">
      <nuxt-link
        :to="$url.category(item.slug)"
        class="category-grid__item flex flex-column "
        v-for="item in items"
        :key="item._id"
      >
        <div class="category-grid__item-image position-relative flex-1">
          <AppImage class="absolute-full" contain v-bind="item.image" />
        </div>
        <div class="category-grid__item-name text-center  shrink-0">
          <b>{{item.name}}</b>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
.category-grid {

  &__item {
    padding: 3.75rem 3.75rem 1rem 3.75rem;
    width: 33.333%;
    border: 1px solid $grey;
    height: 300px;
     &:hover {
        text-decoration: none;
      }
    @include md {
      padding: 1.25rem;
    }
    @include sm {
      width: 50%;
    }
    &-name {
      margin-top: auto;
     
    }
  }
}
</style>