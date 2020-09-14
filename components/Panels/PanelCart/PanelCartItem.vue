<template>
  <div class="panel-cart__item bg-grey p-3">
    <div class="flex">
      <div class="panel-cart__item-img shadow ">
        <nuxt-link class="position-relative d-block w-100 h-100" :to="$url.product(item.slug)">
          <img class="absolute-full size-contain" :src="image" alt />
        </nuxt-link>
      </div>
      <div class="panel-cart__item-content pl-3">
        <div class="mb-2 font-bold trunk">{{name}}</div>
        <div>
          <p>
            {{$t('priceForOne')}}:
            <s class="mr-1 text-12" v-if="oldPrice">{{oldPrice}} {{currency}}</s>
            <b :class="{'color-orange': oldPrice}">{{price}} {{currency}}</b>
          </p>
          <p>
            {{$t('deliveryText')}}:
            <template v-if="delivery24">
              <b class="color-green">{{$t('delivery24')}}</b>
            </template>
            <template v-else>
              <b>{{delivery}} {{deliveryText}}</b>
            </template>
          </p>
        </div>
        <div class="flex mt-3">
          <ProductCnt class="shrink-0" :elClass="['btn-white']" v-model="itemCnt" />
          <div class="btn btn-circle ml-3" @click="removeItem">
            <svgTrash width="20" />
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
      return this.item.default_image && this.item.default_image.url;
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
  },
  methods: {
    removeItem() {
      this.$emit("removeItem");
    },
  },
};
</script>

<style lang="scss" >
.panel-cart__item {
  &-img {
    width: 144px;
    height: 144px;
    background: $white;
    padding: 1rem;
    border-radius: 10px;
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