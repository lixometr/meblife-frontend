<template>
  <Module id="15">
    <div class="container">
      <h2 class="text-24 font-bold uppercase">{{title}}</h2>
      <div class="text-14" v-if="subTitle">{{subTitle}}</div>
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