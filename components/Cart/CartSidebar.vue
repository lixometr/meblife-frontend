<template>
  <div class="cart-sidebar">
    <div class="flex mb-3">
      <h6 class="uppercase">{{ $t("cartPage.sidebarTitle") }}</h6>
      <span class="ml-2">({{ cnt }} {{ itemSclon }})</span>
    </div>
    <CartCollapse class="mb-3" :items="items" />
    <CartSummary :items="items" />
  </div>
</template>

<script>
import { wordForm } from "@/helpers/functions";
export default {
  props: {
    items: Array,
  },
  computed: {
    cnt() {
      return this.items.length;
    },
    itemSclon() {
      return wordForm(this.cnt, this.$t("itemSclon"));
    },
  },
};
</script>

<style lang="scss" >
</style>