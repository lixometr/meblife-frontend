<template>
  <div class="modules-area pt-4 pb-4">
    <ModuleDefiner v-bind="appModule" v-for="appModule in modules" :key="appModule._id" />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    modules: Array,
  },
  data() {
    return {};
  },
  components: {},
  mounted() {},
};
</script>

<style lang="scss" >
</style>