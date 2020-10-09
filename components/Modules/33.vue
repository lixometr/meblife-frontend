<template>
  <Module id="33">
    <h2 class="text-24 font-bold uppercase text-left pb-3" v-if="title">{{title}}</h2>
    <div class="mt-3" v-if="subTitle">{{subTitle}}</div>
    <div class="module-33__grid flex flex-wrap md-column" v-if="moduleImages.length > 0">
      <nuxt-link class="module-33__item pr-3" v-for="(item, idx) in moduleImages" :key="idx">
        <div>{{item.title}}</div>
      </nuxt-link>
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