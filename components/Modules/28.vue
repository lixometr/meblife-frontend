<template>
  <Module id="28">
    <h2 class="text-24 font-bold uppercase text-left pb-3" v-if="title">{{title}}</h2>
    <div class="module-28__grid flex flex-wrap md-column" v-if="moduleImages.length > 0">
      <div class="module-28__item pr-3 mb-4" v-for="(item, idx) in moduleImages" :key="idx">
        <nuxt-link :to="item.more_btn_url" class="btn btn-md w-100 btn-grey">{{item.title}}</nuxt-link>
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
</style>