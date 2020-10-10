<template>
  <div class="header">
    <Nav1 class="header__nav" :variant="'light'" />
    <keep-alive>
      <HeaderMenu class="header__menu" />
    </keep-alive>
  </div>
</template>

<script>
import Logo from "./Logo";
export default {
  props: {
    variant: String,
  },
  components: {
    // Nav,
    Logo,
  },
};
</script>

<style lang="scss">
</style>