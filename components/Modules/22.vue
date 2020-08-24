<template>
  <div class="module-22">
    <div class="container">
      <div class="flex justify-between flex-wrap module-22__items">
        <nuxt-link class="module-22__item mb-7" v-for="(item, idx) in items" :key="idx" to="#">
          <img :src="item.img" class="size-cover h-auto" alt />
          <p class="font-bold text-18 uppercase mt-4 mb-2">{{item.title}}</p>
          <p>{{item.description}}</p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
};
</script>

<style lang="scss" >
.module-22 {
  &__items {
    @include md {
      margin-left: -0.5rem;
      margin-right: -0.5rem;
    }
  }
  &__item {
    width: calc(25% - 18px);
    @media screen and (max-width: 1420px) {
      width: calc(33% - 18px);
    }
    @include md {
      width: 50%;
      padding: 0 0.5rem;
    }
    img {
        @include md {
            height: 140px;
        }
    }
  }
  .module-item {
  }
}
</style>