<template>
  <div class="product-page">
    <Header class="default-header" variant="light" />

    <div class="container">
      <ModuleGroupsArea :moduleGroups="moduleGroupsTop" />
      <div class="flex md-column">
        <div class="product__images-wrapper">
          <div class="product__images">
            <div class="product__btns flex justify-between pr-3 pl-3">
              <div class="product__back product__btn-circle btn-circle" @click="goBack">
                <svgArrowBack width="24" />
              </div>
              <div
                class="product__favourite product__btn-circle btn btn-circle"
                :class="{' is-favourite': isFavourite}"
                @click="toggleFavourite"
              >
                <svgHeartStroke width="24" />
              </div>
            </div>
            <div class="product-labels">
              <template v-if="labels.length > 0">
                <div
                  class="bg-white border uppercase pl-4 pt-1 pb-1 pr-4 mb-2 border-grey text-12"
                  v-for="label in labels"
                  :key="label._id"
                >{{label.name}}</div>
              </template>
            </div>
            <div class="product-slider-wrapper pr-7 pl-7">
              <AppSlider
                class="product-slider overflow-hidden"
                :items="productImages"
                :slideClass="['bg-pale']"
              >
                <template v-slot:slide="{item, idx}">
                  <AppImage v-bind="item" class="size-contain no-bg" @click="openSliderModal(idx)" />
                </template>
              </AppSlider>
            </div>
          </div>
          <div class="product-text-category text-14 pb-2">
            <nuxt-link :to="$url.category(categories[0].slug)">{{categories[0].name}}</nuxt-link>
            <nuxt-link
              v-if="categories.length > 1"
              :to="$url.category(categories[categories.length - 1].slug)"
            >{{categories[categories.length - 1].name}}</nuxt-link>
          </div>
        </div>
        <div class="product-info">
          <div class="product-info__top flex align-center justify-between">
            <div class="product__brand">
              <nuxt-link :to="$url.manufacturer(product.manufacturer.slug)">
                <AppImage v-bind="brandImage" />
              </nuxt-link>
            </div>
            <div class="product__labels shrink-0">
              <div
                class="label-delivery text-12 pl-2 pr-3 bg-green color-white flex align-center rounded"
                v-if="delivery24"
              >
                <svgDelivery width="24" class="mr-1" />
                <span>24</span>
              </div>
            </div>
          </div>
          <h1 class="product__name text-18 mt-4">{{name}}</h1>
          <div class="product__price mt-5 text-18">
            <span class="bg-orange color-white p-1 text-14 mr-2" v-if="sale">-{{sale}}%</span>
            <span class="font-bold mr-1 text-18">{{priceWithCurrency}}</span>
            <s class="text-14" v-if="oldPrice">{{oldPriceWithCurrency}}</s>
          </div>

          <AppDescription class="mt-2 text-14" v-if="saleExpires" :text="promotionText"></AppDescription>

          <div class="flex mt-5">
            <ProductCnt class="product__cnt" v-model="productCnt" />
            <button
              class="product__add_to_cart btn btn-green btn-md ml-3 font-bold flex-1"
              @click.prevent="addToCart"
            >Добавить в корзину</button>
          </div>
          <div class="product-delivery-info text-14 mt-5">
            <div class="product-delivery__item flex align-start">
              <div
                class="product-delivery__icon bg-grey mr-2 rounded flex align-center justify-center"
              >
                <svgCheckmark width="12" />
              </div>
              <div>
                <div
                  class="mb-3"
                  v-if="availableStock || availableStockManufacturer"
                >Товар в наличии!</div>
                <p>
                  на нашем складе:
                  <b>{{availableStock}} шт.</b>
                </p>
                <p v-if="delivery24">
                  Отгрузка в течении
                  <b class="color-green">24 часа.</b>
                </p>
                <div class="mt-3 mb-1">
                  <p>
                    На складе поставщика:
                    <b>{{availableStockManufacturer}} шт.</b>
                  </p>
                  <p v-if="availableStockManufacturer">
                    Закажите товар до
                    <b>{{ $moment(new Date(orderUntil)).format('DD.MM.YYYY')}}</b>, отправим
                    <b>{{ $moment(new Date(deliveryAt)).format('DD.MM.YYYY')}}</b>
                  </p>
                </div>
              </div>
            </div>
            <div class="product-delivery__item flex align-start mt-2">
              <div
                class="product-delivery__icon bg-grey mr-2 rounded flex align-center justify-center"
              >
                <svgTruck width="12" />
              </div>
              <div>
                <p>
                  Доставка
                  <b v-if="!freeDelivery">с оплатой 14,90 {{currency}}</b>
                  <b class="font-bold uppercase" v-else>{{$t('freeDelivery')}}</b>
                </p>
              </div>
            </div>
            <div class="product-delivery__item flex align-start mt-2">
              <div
                class="product-delivery__icon bg-grey mr-2 rounded flex align-center justify-center"
              >
                <svgReturn width="12" />
              </div>
              <div>
                <p>30 дней на возврат</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <ProductInfo :product="product" />

    <ArrowExpand class="md-hidden">
      <template v-slot:default>
        <div class="product-brand__details flex justify-center mb-5">
          <AppImage width="200" v-bind="brandImage" />
        </div>
      </template>
      <template v-slot:btnText>Показать детали бренда</template>
    </ArrowExpand>
    <LazyProductLooks />
    <LazyProductSimilarItems />
    <LazyProductInspirations />
    <LazyProductSimilarCategories />
    <ProductCategories :items="categories" :activeCategory="category" />
    <div class="container">
      <ModuleGroupsArea :moduleGroups="moduleGroupsBottom" />
    </div>
  </div>
</template>
<script>
import svgHeartStroke from "@/assets/icons/heart-stroke.svg";
import svgArrowBack from "@/assets/icons/arrow-back.svg";
import svgDelivery from "@/assets/icons/delivery.svg";
import svgCheckmark from "@/assets/icons/checkmark.svg";
import svgTruck from "@/assets/icons/truck.svg";
import svgReturn from "@/assets/icons/return.svg";
import svgArrowDown from "@/assets/icons/arrow-down-sm.svg";
import svgArrowRight from "@/assets/icons/arrow-right.svg";
import AppSlider from "@/components/AppSlider";
import ArrowExpand from "@/components/ArrowExpand";
import ProductAttrs from "@/components/Product/ProductAttrs";
import AppCollapse from "@/components/AppCollapse";
import ProductCategories from "@/components/Product/ProductCategories";
import ProductInfo from "@/components/Product/ProductInfo";
import Header from "@/components/Header";
import ProductCnt from "@/components/Product/ProductCnt";
// import ProductSimilarItems from "@/components/Product/ProductSimilarItems";
// import ProductSimilarCategories from "@/components/Product/ProductSimilarCategories";
export default {
  name: "ProductSlug",
  head() {
    return {
      title: this.product.full_name,
    };
  },
  components: {
    svgHeartStroke,
    svgArrowBack,
    svgDelivery,
    svgCheckmark,
    svgTruck,
    svgReturn,
    svgArrowDown,
    svgArrowRight,
    AppSlider,
    ArrowExpand,
    ProductAttrs,
    ProductCategories,
    AppCollapse,
    ProductInfo,
    Header,
    ProductCnt,
    // ProductSimilarItems: () => import("@/components/Product/ProductSimilarItems"),
    // ProductSimilarCategories: () => import("@/components/Product/ProductSimilarCategories"),
  },
  async asyncData({ route, error, store, params, query, $api, $loader }) {
    $loader.start();
    try {
      const product = await $api.$get("product", { slug: route.params.slug });
      const productCategories = await $api.$get("categoryParents", {
        slug: product.primary_category.slug,
      });
      const moduleGroupsBottom = await store.dispatch(
        "fetchModuleGroups",
       {moduleGroupIds:  product.module_groups_bottom, area: 'product'}
      );
      const moduleGroupsTop = await store.dispatch(
        "fetchModuleGroups",
        {moduleGroupIds: product.module_groups_top}
      );
      $loader.stop();

      return {
        product,
        productCategories,
        moduleGroupsBottom,
        moduleGroupsTop,
      };
    } catch (err) {
      $loader.stop();

      error(err);
    }
  },
  data() {
    return {
      productCnt: 1,
    };
  },
  computed: {
    isFavourite() {
      return this.$store.getters["favourite/isFavourite"](this.product._id);
    },
    sale() {
      if (this.product.promotion) {
        return this.product.promotion.value;
      }
      return false;
    },
    labels() {
      return this.product.labels || [];
    },
    promotionText() {
      const saleText = this.$t("promotionText");
      const date = this.$moment(new Date(this.saleExpires)).format(
        "DD.MM.YYYY"
      );
      return saleText.replace("{{date}}", `<b>${date}</b>`);
    },
    saleExpires() {
      if (this.product.promotion) {
        return this.product.promotion.end_at;
      }
      return false;
    },

    attributes() {
      return this.product.attributes;
    },
    productImages() {
      return this.product.product_images;
      return [
        {
          url:
            "https://cdn.wonder.pl/cdn-cgi/image/width=850,height=850,quality=85,format=auto/product-file/441142da42c26d06df9cf3f50879d367c2a2124f.jpg",
        },
        {
          url:
            "https://cdn.wonder.pl/cdn-cgi/image/width=850,height=850,quality=85,format=auto/product-file/50aba17d095e58a36221a2c8b5259979afbc3043.jpg",
        },
        {
          url:
            "https://cdn.wonder.pl/cdn-cgi/image/width=850,height=850,quality=85,format=auto/product-file/2c2431c8aa2047c15d52e5b2add71dd60ac29962.jpg",
        },
      ];
    },
    category() {
      return this.product.primary_category;
    },
    categories() {
      return this.productCategories;
      return [
        { name: "Аксусуары", slug: "#" },
        { name: "Аксусуары для упражнений", slug: "#" },
        {
          name:
            "Тренировочная резинка Power Band GT by Tiguar уровень 3 оливковый",
          slug: "#",
        },
      ];
    },
    sizeImage() {
      return this.product.size_image;
    },
    delivery24() {
      return this.product.delivery_24;
    },
    freeDelivery() {
      return this.product.free_delivery;
    },
    deliveryAt() {
      return this.product.delivery_at;
    },
    orderUntil() {
      return this.product.order_until;
    },
    name() {
      return this.product.full_name;
    },
    price() {
      return this.product.price;
      return "400";
    },
    currency() {
      return this.$store.getters.currency;
    },
    priceWithCurrency() {
      return this.price + " " + this.currency;
    },
    oldPrice() {
      return this.product.old_price;
    },
    oldPriceWithCurrency() {
      return this.oldPrice + " " + this.currency;
    },
    brandImage() {
      return this.product.manufacturer.image;
    },
    availableStock() {
      return this.product.available_stock;
    },
    availableStockManufacturer() {
      return this.product.available_stock_manufacturer;
    },
    description() {
      return this.product.description;
    },
  },
  methods: {
    goBack() {
      this.$router.push(this.$url.category(this.category.slug));
    },
    toggleFavourite() {
      this.$store.dispatch("favourite/toggle", { id: this.product._id });
    },
    addToCart() {
      let isNew = !this.$store.getters["cart/hasItem"](this.product._id);

      this.$store.dispatch("cart/add", {
        id: this.product._id,
        cnt: this.productCnt,
      });
      console.log(isNew);
      this.openCartModal(isNew);
    },
    openCartModal(added) {
      this.$store.dispatch("modal/open", {
        name: "panel-cart",
        props: { added },
      });
    },
    openSliderModal(startIdx) {
      this.$store.dispatch("modal/open", {
        name: "slider-modal",
        props: {
          initialSlide: startIdx,
          items: this.productImages,
        },
      });
    },
  },
};
</script>
<style lang="scss" >
.product-page {
  padding-top: 7rem;
  @include md {
    padding-top: 0;
  }
  .product__images-wrapper {
    flex: 1;
    min-width: 0;
  }
  .product__images {
    background-color: $pale;
    padding: 1rem 0;
    // min-height: 600px;
    position: relative;
    @include md {
      padding-top: 5rem;
    }
  }
  .product-info {
    flex-shrink: 0;
    width: 24rem;
    padding-left: 2rem;
    @include md {
      width: 100%;
      padding-left: 0;
    }
  }
  .product__favourite.is-favourite {
    background: $black;

    svg {
      fill: $white;
    }
    &:hover {
      background: $black;
      svg {
        fill: $white;
      }
    }
  }
  .product-labels {
    position: absolute;
    top: 80px;
    right: 0;
    z-index: 30;
  }

  .product-delivery__icon {
    width: 20px;
    height: 20px;
  }
  .product-text-category {
    a {
      &::after {
        content: "";
        background-color: $dark;
        width: 5px;
        height: 5px;
        display: inline-block;
        vertical-align: middle;
        margin: 0 5px;
        border-radius: 2px;
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
    }
  }
  .product__description {
    margin-bottom: 2.5rem;
  }
  .product__tabs {
    padding: 2.5rem 0;
  }
  .product-attr {
    flex: 1 0 50%;
    max-width: 50%;
    min-width: 300px;
    &__item {
      padding: 0.25rem 1rem;
      &:nth-child(odd) {
        background-color: $grey;
      }
    }
  }
  .product-attrs {
    margin-left: -1rem;
    margin-right: -1rem;
    margin-top: 2.5rem;
    @include md {
      margin-top: 0;
    }
  }
  .product-btn-brand-switcher {
    position: relative;
    &::before {
      content: "";
      width: 100%;
      height: 2px;
      background-color: $grey;
      display: block;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 0;
      right: 0;
      z-index: 1;
    }
    .btn {
      z-index: 2;
      position: relative;
      svg {
        transition: transform 0.3s;
      }
      &.open {
        svg {
          transform: rotate(180deg);
        }
      }
    }
  }
  .product-brand__details {
    transition: 0.3s;
  }
  .product-slider-wrapper {
    overflow: hidden;
  }
  .product-slider {
    img {
      cursor: pointer;
    }
  }
  .btn-categories {
    // overflow-x: auto;
    overflow: auto;
    @include md {
      justify-content: flex-start;
    }
  }
}
</style>