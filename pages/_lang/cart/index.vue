<template>
  <div class="cart-index">
    <div class="cart-index__header mb-5">
      <h6>{{ $t("cartPage.first.title") }}</h6>
      <div class="cart-index__btns">
        <nuxt-link to="/" class="btn btn-white btn-md mr-3 md-hidden font-bold">
          {{ $t("cartPage.first.btnBack") }}
        </nuxt-link>
        <div class="btn btn-green btn-md font-bold" @click="nextStep">
          {{ $t("cartPage.first.btnNextStep") }}
          <svgArrowRight width="20" class="ml-2" />
        </div>
      </div>
    </div>
    <div class="cart-index__cart">
      <CartItem
        v-for="(item, index) in items"
        :item="item"
        :cnt="cartItems[index] && cartItems[index].cnt"
        :key="item._id"
        class="mb-3"
        @changeCnt="onItemChangeCnt($event, item.id)"
        @removeItem="onItemRemove(item.id)"
      />
    </div>
    <div class="flex md-column">
      <div class="flex-1 pr-3">
        <div>
          <AppCollapse class="cart-card">
            <template #trigger="{ open }">
              <div class="p-3 flex align-center justify-between cursor-pointer">
                <b class="uppercase">
                  {{ $t("promocode.title") }}
                </b>
                <span v-if="open"><svgMinus width="20" /></span>
                <span v-else><svgPlus width="20" /></span>
              </div>
            </template>
            <template #content>
              <div class="p-3">
                <PromocodeForm @success="applyPromo" />
              </div>
            </template>
          </AppCollapse>
        </div>
        <div class="mt-3">
          <b class="uppercase">{{ $t("cartPage.help") }}</b>
        </div>
        <div class="mt-3">
          <div class="cart-card p-3">
            <h6>{{ $t("cartPage.deliveryTime.title") }}</h6>
            <p class="text-12">
              {{ $t("cartPage.deliveryTime.subTitle") }}
            </p>
            <div>
              {{ $t("cart.deliveryText") }}:
              <template v-if="delivery24">
                <b class="color-green">{{ $t("delivery24") }}</b>
              </template>
              <template v-else>
                <b>{{ delivery }} {{ deliveryText }}</b>
              </template>
            </div>
            <div
              class="underline cursor-pointer text-12 font-bold uppercase mt-1"
              @click="openPanelContact"
            >
              {{ $t("cartPage.deliveryTime.helpText") }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div class="cart-card mb-3 p-3">
          <h6 class="mb-2">{{ $t("cartPage.deliveryCost.title") }}</h6>
          <div class="text-right">
            <div class="text-14 font-bold">
              {{ $t("from") }} {{ deliveryCost }} {{ currency }}
            </div>
            <div class="mt-2 text-12">
              {{ $t("cartPage.deliveryCost.note") }}
            </div>
          </div>
        </div>
        <CartSummary :items="items" />
      </div>
    </div>
    <div class="cart-index__btns justify-end flex mt-3">
      <nuxt-link to="/" class="btn btn-white btn-md mr-3 md-hidden font-bold">
        {{ $t("cartPage.first.btnBack") }}
      </nuxt-link>
      <div class="btn btn-green btn-md font-bold" @click="nextStep">
        {{ $t("cartPage.first.btnNextStep") }}
        <svgArrowRight width="20" class="ml-2" />
      </div>
    </div>
  </div>
</template>

<script>
import svgPlus from "@/assets/icons/plus-thick.svg";
import svgMinus from "@/assets/icons/minus.svg";
import svgArrowRight from "@/assets/icons/arrow-right.svg";
import { wordForm } from "@/helpers/functions";

export default {

  components: {
    svgPlus,
    svgMinus,
    svgArrowRight,
  },
  props: {
    items: Array
  },
  data() {
    return {
      isLoading: false,
      promo: "",
    };
  },
  computed: {
    deliveryCost() {
      return 0;
    },
    delivery24() {
      return this.items.every((item) => item.delivery_24);
    },
    delivery() {
      return Math.max(
        ...this.items
          .filter((item) => !isNaN(parseInt(item.delivery_days)))
          .map((item) => item.delivery_days)
      );
    },
    deliveryText() {
      return wordForm(this.delivery, this.$t("daySclon"));
    },
    cartItems() {
      return this.$store.getters["cart/items"];
    },
    currency() {
      return this.$store.getters.currency;
    },
  },
  methods: {
    openPanelContact() {
      this.$store.dispatch("modal/open", { name: "panel-contact" });
    },
    applyPromo() {
      this.promo = promo;
    },
    nextStep() {
      this.$emit("nextStep");
    },

    onItemChangeCnt(newValue, id) {
      this.$store.dispatch("cart/update", { id, cnt: newValue });
    },
    onItemRemove(id) {
      this.$store.dispatch("cart/remove", { id });
    },
  },
  watch: {
    cartItems(newValue, prevValue) {
      if (newValue.length === prevValue.length) return;
      this.fetchItems();
    },
  },
};
</script>

<style lang="scss" >
.cart-index {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
}
</style>