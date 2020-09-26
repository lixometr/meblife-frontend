<template>
  <div class="currency-switcher">
    <div class="currency-switcher__trigger p-2  btn btn-black w-100 text-14" @click="toggle">
      {{activeCurrency.name}}
      <svgArrowDown width="15" :class="{'rotate-180': isOpen}"/>
    </div>
    <div class="currency-switcher__list select-list bg-white" v-if="isOpen">
      <div
        class="currency-switcher__item text-14 p-2 cursor-pointer"
        :class="{'active ': activeCurrency._id === currency._id}"
        v-for="currency in currencies"
        :key="currency._id"
        @click="switchCurrency(currency.symbol)"
      >{{currency.name}}</div>
    </div>
  </div>
</template>

<script>
import svgArrowDown from "@/assets/icons/arrow-down-triangle.svg";

export default {
  data() {
    return {
      isOpen: false,
    };
  },
  components: {
    svgArrowDown,
  },
  computed: {
    currencies() {
      return this.$store.getters['currency/currencies'];
    },
    activeCurrency() {
      return this.$store.getters['currency/activeCurrency'] || {};
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    switchCurrency(symbol) {
      this.$store.commit("currency/selectCurrency", symbol);
      this.isOpen = false
    },
  },
};
</script>

<style lang="scss" >
.currency-switcher {
  position: relative;
  min-width: 120px;
  
}
</style>