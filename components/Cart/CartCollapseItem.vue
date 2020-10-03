<template>
  <div class="cart__item">
    <div class="flex">
      <div class="cart-collapse-item__img border border-grey shrink-0">
        <nuxt-link
          class="position-relative d-block w-100 h-100"
          :to="$url.product(item.slug)"
        >
          <AppImage class="absolute-full size-contain" v-bind="image" />
        </nuxt-link>
      </div>
      <div class="cart__item-content flex flex-column pl-3 text-14 text-right">
        <div class="mb-2">{{ name }}</div>
        <div class="mt-auto">
          <div v-if="oldPrice">
            {{ $t("cart.priceForOne") }}:
            <s class="mr-1 text-14"> {{ oldPrice }} {{ currency }} </s>
          </div>
          <p>
            {{ $t("cart.deliveryText") }}:
            <template v-if="delivery24">
              <b class="color-green">{{ $t("delivery24") }}</b>
            </template>
            <template v-else>
              <b>{{ delivery }} {{ deliveryText }}</b>
            </template>
          </p>
        </div>
      </div>
    </div>
    <div>
      <div class="flex justify-between mt-4">
        <div class="flex">
          <ProductCnt
            class="shrink-0"
            :elClass="['btn-white']"
            :max="cntMax"
            v-model="itemCnt"
          />
          <div
            class="btn btn-circle border border-grey ml-3"
            @click="removeItem"
          >
            <svgTrash width="20" />
          </div>
        </div>
        <div class="mt-auto pb-1 pr-1">
          <div class="text-right">
              <div class="text-14 mb-1">{{$t('cart.sum')}}</div>
            <div class="text-20">
              <b :class="{ 'color-orange': oldPrice }"
                >{{ price }} {{ currency }}</b
              >
            </div>

            <div class="color-orange text-14" v-if="sale">
              {{ $t("cart.economy") }}: {{ saleD }} {{ currency }} • {{ sale }}%
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import svgTrash from "@/assets/icons/trash.svg";
import { wordForm } from "@/helpers/functions";
export default {
  props: {
    item: Object,
    cnt: [Number],
  },
  components: {
    svgTrash,
  },
  computed: {
    itemCnt: {
      get() {
        return this.cnt;
      },
      set(val) {
        this.$emit("changeCnt", val);
      },
    },
    cntMax() {
      return this.item.available_stock + this.item.available_stock_manufacturer;
    },
    name() {
      return this.item.full_name;
    },
    delivery() {
      return this.item.delivery_days;
    },
    deliveryText() {
      return wordForm(this.delivery, this.$t("daySclon"));
    },
    delivery24() {
      return this.item.delivery_24;
    },
    image() {
      return this.item.default_image;
    },
    price() {
      return this.item.price;
    },
    oldPrice() {
      return this.item.old_price;
    },
    currency() {
      return this.$store.getters.currency;
    },
    sale() {
      return (this.item.promotion && this.item.promotion.value) || null;
    },
    saleD() {
      return this.oldPrice - this.price;
    },
  },
  methods: {
    removeItem() {
      this.$emit("removeItem");
    },
  },
};
</script>

<style lang="scss" >
.cart-collapse-item {
  &__img {
    width: 144px;
    height: 100px;
    background: $white;
    padding: 1rem;
    border-radius: 5px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 400px) {
      width: 100px;
      height: 100px;
    }
  }
}
</style>