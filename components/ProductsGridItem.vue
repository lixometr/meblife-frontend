<template>
  <div class="products-grid-item">
    <nuxt-link
      class="d-block h-100 no-underline position-relative"
      :to="$url.product(item.slug)"
    >
      <div class="products-grid-item__labels z-1">
        <div
          class="products-grid-item__label bg-white border color-orange pl-4 pt-1 pb-1 pr-4 mb-2 border-grey text-12"
          v-if="sale"
        >
          -{{ sale }}%
        </div>
        <template v-if="labels.length > 0">
          <div
            class="products-grid-item__label bg-white border uppercase pl-4 pt-1 pb-1 pr-4 mb-2 border-grey text-12"
            v-for="label in labels"
            :key="label._id"
          >
            {{ label.name }}
          </div>
        </template>
      </div>
      <div class="products-grid-item__img" v-ripple.300>
        <div class="absolute-full products-grid-item__img-wrapper">
          <AppImage class="no-bg" contain v-bind="image" :alt="name" />
        </div>
      </div>
      <div class="products-grid-item__name mt-4 mb-2">
        <h3 class="truncate text-14 font-bold capitalize hover-underline">
          {{ name }}
        </h3>
      </div>
      <div class="products-grid-item__price">
        <s class="mr-1" v-if="oldPrice">{{ oldPrice }} {{ currency }}</s>
        <span class="color-orange">{{ price }} {{ currency }}</span>
      </div>
      <div
        class="products-grid-item__delivery24 color-green font-bold"
        key="isDelivery24"
        v-if="delivery24"
      >
        {{ $t("delivery24") }}
      </div>

      <div class="products-grid-item__delivery" key="noDelivery24" v-else>
        <span v-if="delivery">{{ delivery }} {{ deliveryText }}</span>
      </div>
    </nuxt-link>
    <div class="products-grid-item__preview">
      <div
        class="btn btn-circle btn-white flex align-center justify-center"
        @click="openPreview"
      >
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
      return this.item.default_image;
    },
    name() {
      return this.item.full_name;
    },
    sale() {
      return this.item.promotion && this.item.promotion.value;
    },
    labels() {
      return this.item.labels || [];
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
      return this.item._id;
    },
    slug() {
      return this.item.slug;
    },
    delivery24() {
      return this.item.delivery_24;
    },
  },
  methods: {
    openPreview() {
      this.$modal.show("panel-product-preview", {
        slug: this.slug,
      });
    },
  },
};
</script>

<style lang="scss">
.products-grid-item {
  position: relative;
  &__img {
    // height: 420px;
    // padding: 1.5rem;
    background: $pale;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    padding-bottom: 100%;
    position: relative;
    &-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      padding: 1.5rem;
    }
    img {
    }
    @media screen and (max-width: 1420px) {
      // height: 300px;
    }
  }
  &__preview {
    position: absolute;
    top: 18px;
    right: 25px;
    z-index: 10;
  }
  &__labels {
    position: absolute;
    top: 20px;
  }
  &__label {
    border-left: none;
  }
}
</style>