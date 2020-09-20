<template>
  <Module id="15">
    <h2 class="text-24 font-bold uppercase">{{title}}</h2>
    <AppDescription class="text-14" v-if="description" :text="description"></AppDescription>
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