<template>
  <div class="cart-collapse">
    <AppCollapse>
      <template #trigger="{ open }">
        <div
          class="cart-collapse__trigger transition p-3 cart-card flex align-center justify-between cursor-pointer"
          :class="{ open: open }"
        >
          <b class="uppercase text-14">
            {{ $t("cartPage.cartCollapseTitle") }}
          </b>
          <span v-if="open"><svgMinus width="20" /></span>
          <span v-else><svgPlus width="20" /></span>
        </div>
      </template>
      <template #content>
        <div class="cart-card cart-collapse__content pl-3 pr-3">
          <CartCollapseItem
            class="cart-collapse__item"
            duration="0"
            v-for="(item, idx) in items"
            :key="item._id"
            :cnt="cartItems[idx] && cartItems[idx].cnt"
            :item="item"
            @changeCnt="onItemChangeCnt($event, item.id)"
            @removeItem="onItemRemove(item.id)"
          />
        </div>
      </template>
    </AppCollapse>
  </div>
</template>

<script>
import svgPlus from "@/assets/icons/plus-thick.svg";
import svgMinus from "@/assets/icons/minus.svg";
import svgArrowRight from "@/assets/icons/arrow-right.svg";
export default {
  async fetch() {
    try {
      await this.fetchItems();
    } catch (err) {
      this.$error(err);
    }
  },
  components: {
    svgPlus,
    svgMinus,
    svgArrowRight,
  },
  data() {
    return {
      items: [],
    };
  },
  computed: {
    cartItems() {
      return this.$store.getters["cart/items"];
    },
  },
  methods: {
    async fetchItems() {
      this.isLoading = true;
      try {
        const resolvers = this.cartItems.map(async (item) => {
          const { data: product } = await this.$api.get("productById", {
            id: item.id,
          });
          return product;
        });
        const items = await Promise.all(resolvers);
        this.items = items;
      } catch (err) {
        this.$error(err);
      }
      this.isLoading = false;
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
.cart-collapse {
  &__trigger {
    &:hover {
      background: $grey;
    }
    &.open {
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  &__content {
    border-radius: 0 !important;
    border-top: none;
  }
  &__item {
    border-bottom: 1px dashed $grey;
    padding: 1rem 0;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>