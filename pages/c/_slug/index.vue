<template>
  <div>
    <h1>index</h1>
    {{items}}
    <Loader v-if="isLoading" />
  </div>
</template>

<script>
import Loader from "@/components/Loader";
export default {
  name: "CategoryProducts",
  components: {
    Loader,
  },
  props: {
    isLoading: Boolean,
    items: Array,
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" >
</style>