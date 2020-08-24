<template>
  <div class="module-15 mb-4">
    <div class="container">
      <h2 class="text-24 font-bold uppercase">{{title}}</h2>
      <div class="text-14" v-if="subTitle">{{subTitle}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subTitle: String,
  },
};
</script>

<style lang="scss">
</style>