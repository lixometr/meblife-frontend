<template>
  <div class="products-grid-item">
    <nuxt-link class="d-block h-100 no-underline" :to="$url.product(item.slug)">
      <div class="products-grid-item__img">
        <img class="no-bg size-contain" :src="image" :alt="name" />
      </div>
      <div class="products-grid-item__name mt-4 mb-2">
        <h3 class="truncate text-14 font-bold capitalize hover-underline">{{name}}</h3>
      </div>
      <div class="products-grid-item__price">
        <s class="mr-1" v-if="oldPrice">{{oldPrice}} {{currency}}</s>
        <span class="color-orange ">{{price}} {{currency}}</span>
      </div>
      <div class="products-grid-item__delivery">{{delivery}} {{deliveryText}}</div>
    </nuxt-link>
    <div class="products-grid-item__preview">
      <div class="btn btn-circle btn-white flex align-center justify-center" @click="openPreview">
        <svgZoom width="25" />
      </div>
    </div>
  </div>
</template>

<script>
import svgZoom from "@/assets/icons/zoom.svg";
import { wordForm } from "@/helpers/functions";
export default {
  components: {
    svgZoom,
  },
  props: {
    item: Object,
  },
  computed: {
    image() {
      return this.item.default_image && this.item.default_image.url;
    },
    name() {
      return this.item.full_name;
    },
    currency() {
      return this.$store.getters.currency;
    },
    price() {
      return this.item.price;
    },
    oldPrice() {
      return this.item.old_price;
    },
    delivery() {
      return this.item.delivery_days;
    },
    deliveryText() {
      return wordForm(this.delivery, this.$t("daySclon"));
    },
    id() {
      return this.item._id
    },
    slug() {
      return this.item.slug
    }
  },
  methods: {
    openPreview() {
      this.$modal.show('panel-product-preview', {
        slug: this.slug
      })
    },
  },
};
</script>

<style lang="scss">
.products-grid-item {
  position: relative;
  &__img {
    
    height: 420px;
    padding: 1.5rem;
    background: $pale;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    @media screen and (max-width: 1420px){
      height: 300px;
    }
  }
  &__preview {
    position: absolute;
    top: 18px;
    right: 25px;
    z-index: 10;
  }
}
</style>