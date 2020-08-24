<template>
  <div class="header">

    <Nav class="header__nav" :variant="variant" />
  </div>
</template>

<script>
import Nav from "./Nav";
import Logo from "./Logo";
export default {
  props: {
    variant: String,
  },
  components: {
    Nav,
    Logo,
  },
};
</script>

<style lang="scss">
</style>