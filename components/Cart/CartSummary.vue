<template>
  <div class="cart-card p-3">
    <h6 class="mb-2">{{ $t("cartPage.total.title") }}</h6>
    <div class="cart-index__total-items w-100">
      <div class="cart-index__total-item">
        <span class="text-14">{{ $t("cartPage.total.deliveryCost") }}:</span>
        <span>{{ deliveryCost }} {{ currency }}</span>
      </div>
      <div class="cart-index__total-item">
        <span class="text-14">{{ $t("cartPage.total.total") }}:</span>
        <s class="text-14">{{ oldPrice }} {{ currency }} </s>
      </div>
      <div class="cart-index__total-item">
        <span class="text-14">{{ $t("cartPage.total.sale") }}:</span>
        <span class="text-14">-{{ saleD }} {{ currency }}</span>
      </div>
      <div class="cart-index__total-item">
        <span class="text-14">{{ $t("cartPage.total.sale") }}:</span>
        <div class="color-orange text-right">
          <div class="text-20 font-bold">
            {{ totalWithSale }} {{ currency }}
          </div>
          <div class="text-14">
            {{ $t("cart.economy") }}: {{ saleD }} {{ currency }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
  computed: {
        totalWithSale() {
      return this.items.reduce((sum, item) => {
        const cartItem = this.$store.getters["cart/getItem"](item._id);
        if (!cartItem) return sum;
        const cnt = cartItem.cnt;
        sum += item.price * cnt;
        return sum;
      }, 0);
    },

    oldPrice() {
      return this.items.reduce((sum, item) => {
        const cartItem = this.$store.getters["cart/getItem"](item._id);
        if (!cartItem) return sum;
        const cnt = cartItem.cnt;
        let price = item.old_price || item.price;
        sum += price * cnt;
        return sum;
      }, 0);
    },
    currency() {
        return this.$store.getters.currency
    },
    saleD() {
      return this.items
        .filter((item) => !isNaN(parseInt(item.old_price)))
        .reduce((sum, item) => {
          const cartItem = this.$store.getters["cart/getItem"](item._id);
          if (!cartItem) return sum;
          const cnt = cartItem.cnt;
          let d = item.old_price - item.price
          sum += d * cnt;
          return sum;
        }, 0);
    },
    deliveryCost() {
      return 0;
    },
  }
};
</script>

<style lang="scss" >
</style>