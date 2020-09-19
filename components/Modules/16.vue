<template>
  <Module id="16">
    <h2 class="text-24 font-second mb-3 font-bold uppercase">{{title}}</h2>
    <div class="module-16__items flex flex-wrap">
      <div class="module-16__item mt-3" v-for="(item, idx) in moduleImages" :key="idx">
        <nuxt-link
          :to="item.more_btn_url || '#'"
          class="flex align-center rounded p-4 bg-grey w-100"
        >
          <AppImage :style="{maxWidth:'50px'}" class="ml-2 no-bg" v-bind="item.image" />
          <p class="font-bold ml-3 mr-2 break-word uppercase">{{item.title}}</p>
        </nuxt-link>
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
        background: lighten($smoke, 2);
      }
    }
    a {
      background: $smoke;
      height: 100%;
      transition: 0.3s;
      border: 1px solid $grey;
      p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        word-break: break-word;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>