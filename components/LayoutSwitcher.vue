<template>
  <div class="layout-switcher cursor-pointer" v-on="$listeners" v-bind="$attrs">
    <svgLayout class="no-fill" width="20" />
  </div>
</template>

<script>
import svgLayout from "@/assets/icons/grid.svg";

export default {
    components: {
        svgLayout
    }
};
</script>

<style lang="scss">
.layout-switcher {
    border: 1px solid $grey;
    background: $white;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background: $black;
        color: $white;
    }
}
</style>