<template>
  <Module id="26">
    <div class="container">
      <div class="flex justify-between flex-wrap module-26__items">
        <div class="module-26__item mb-5" v-for="(item, idx) in moduleImages" :key="idx">
          <nuxt-link class="module-26__image" :to="item.more_btn_url">
            <AppImage v-bind="item.image" cover class="h-auto" />
          </nuxt-link>
          <nuxt-link :to="item.more_btn_url">
            <h2 class="font-bold text-18 uppercase mt-4 mb-2">{{item.title}}</h2>
          </nuxt-link>
          <p class="mt-2" v-if="item.sub_title">{{item.sub_title}}</p>
          <nuxt-link
            :to="item.more_btn_url"
            class="mt-4 btn btn-md btn-grey font-bold"
            v-if="item.more_btn"
          >{{item.more_btn}}</nuxt-link>
        </div>
      </div>
    </div>
  </Module>
</template>

<script>
import moduleValidator from "./moduleValidator";
import ModuleMixin from "./ModuleMixin";
export default {
  props: {
    item: moduleValidator,
  },
  mixins: [ModuleMixin],
};
</script>

<style lang="scss" >
.module-26 {
  &__items {
    @include md {
      margin-left: -0.5rem;
      margin-right: -0.5rem;
    }
  }
  &__item {
    width: calc(50% - 18px);

    @include md {
      width: 100%;
      padding: 0 0.5rem;
    }
    img {
      height: 220px;
      @include md {
        height: 140px;
      }
    }
  }
  .module-item {
  }
}
</style>