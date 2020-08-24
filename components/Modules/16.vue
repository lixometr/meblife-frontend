<template>
  <div class="module-16">
    <div class="container">
      <h2 class="text-24 font-second mb-3 font-bold uppercase">{{title}}</h2>
      <div class="module-16__items flex flex-wrap">
        <div class="module-16__item mt-3" v-for="(item, idx) in items" :key="idx">
          <nuxt-link to="#" class="flex align-center rounded p-4 bg-grey  w-100">
            <img class="ml-2 no-bg" :src="item.img" alt />
            <p class="font-bold ml-3 mr-2 break-word">{{item.name}}</p>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    items: Array,
  },
};
</script>

<style lang="scss">
.module-16 {
  &__items {
    margin-right: -1.25rem;
    @include md {
        margin-right: 0;
    }
  }
  &__item {
    padding-right: 1.25rem;
    width: 25%;
    @include md {
      width: 100%;
      padding-right: 0;
    }
    &:hover {
        a {
            color: $white;
        }
    }
    a {
        transition: .3s;
        border: 1px solid rgba($white, .25);
    }
  }
}
</style>