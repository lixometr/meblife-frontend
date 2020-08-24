<template>
  <div class="product-page">
    <Header class="default-header" variant="light" />

    <SliderModal />
    <div class="container">
      <div class="flex md-column">
        <div class="product__images-wrapper">
          <div class="product__images">
            <div class="product__btns flex justify-between pr-3 pl-3">
              <div class="product__back product__btn-circle btn-circle" @click="goBack">
                <svgArrowBack width="24" />
              </div>
              <div class="product__favourite product__btn-circle btn-circle" @click="makeFavourite">
                <svgHeartStroke width="24" />
              </div>
            </div>
            <div class="product-slider-wrapper pr-7 pl-7">
              <AppSlider
                class="product-slider overflow-hidden"
                :items="productImages"
                :slideClass="['bg-pale']"
              >
                <template v-slot:slide="{item, idx}">
                  <img :src="item.url" alt class="size-contain no-bg" @click="openSliderModal(idx)" />
                </template>
              </AppSlider>
            </div>
          </div>
          <div class="product-text-category text-14 pb-2">
            <nuxt-link :to="categories[0].slug">{{categories[0].name}}</nuxt-link>
            <nuxt-link
              :to="categories[categories.length - 2].slug"
            >{{categories[categories.length - 2].name}}</nuxt-link>
          </div>
        </div>
        <div class="product-info">
          <div class="product-info__top flex align-center justify-between">
            <div class="product__brand">
              <nuxt-link to="#">
                <img :src="brandImage" alt="brand" />
              </nuxt-link>
            </div>
            <div class="product__labels shrink-0">
              <div
                class="label-delivery text-12 pl-2 pr-3 bg-green color-white flex align-center rounded"
              >
                <svgDelivery width="24" class="mr-1" />
                <span>24</span>
              </div>
            </div>
          </div>
          <h1 class="product__name text-18 mt-4">{{name}}</h1>
          <div class="product__price mt-5 text-18 font-bold">{{priceWithCurrency}}</div>
          <div class="flex mt-5">
            <div class="product__cnt btn btn-md btn-grey">1</div>
            <button
              class="product__add_to_cart btn btn-green btn-md ml-3 font-bold flex-1"
              @click="addToCart"
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
                <div class="mb-3">Товар в наличии!</div>
                <p>
                  на нашем складе:
                  <b>20 шт.</b>
                </p>
                <p>
                  Отгрузка в течении
                  <b class="color-green">24 часа.</b>
                </p>
                <div class="mt-3 mb-1">
                  <p>
                    На складе поставщика:
                    <b>10 шт.</b>
                  </p>
                  <p>
                    Закажите товар до
                    <b>16.08.2020</b>, отправим
                    <b>24.08.2020.</b>
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
                  Доставка с оплатой
                  <b>14,90 зл.</b>
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

    <ProductInfo
      :attributes="{common: [{name: 'Производитель', value: 'Сам', slug: '#'}, {name: 'Код товара', value: '132653'}, {name: 'Биржевой символ',value: 'ПБ-GT0003' }], items: [{name: 'Материал', attributes: [{name: 'Материал', value: 'Резина', slug: '/test'}]}, {name: 'Цвет', attributes: [{name: 'цвет', value: 'зеленый', slug: '/green'}]}]}"
      :description="description"
      :delivery="deliveryText"
    />

    <ArrowExpand class="md-hidden">
      <template v-slot:default>
        <div class="product-brand__details flex justify-center mb-5">
          <img width="200" :src="brandImage" alt />
        </div>
      </template>
      <template v-slot:btnText>Показать детали бренда</template>
    </ArrowExpand>

    <div class="similar-products-slider overflow-hidden">
      <div class="container">
        <h3 class="mb-4">Товары похожие на этот</h3>
        <AppSlider
          :items="similarItems"
          :options="{slidesPerView: 'auto',spaceBetween: 20}"
          :slideClass="['slide-width']"
          :height="'400px'"
        >
          <template v-slot:slide="{item}">
            <nuxt-link to="#" class="shadow flex flex-column rounded-10 p-4 h-100">
              <div class="flex-1 flex align-center">
                <img :src="item.img" alt />
              </div>
              <p class="font-bold truncate white-space-no-wrap">{{item.name}}</p>
              <p class="text-14">{{item.price}}</p>
              <p class="color-green">{{item.delivery}}</p>
            </nuxt-link>
          </template>
        </AppSlider>
      </div>
    </div>
    <div class="similar-categories-slider overflow-hidden mt-7" v-if="similarCategories.length">
      <div class="container">
        <h3 class="mb-4 uppercase">Соответствующие категории</h3>
        <AppSlider
          :items="similarCategories"
          :options="{slidesPerView: 'auto', spaceBetween:  20, }"
          :slideClass="['slide-width']"
          :height="'400px'"
        >
          <template v-slot:slide="{item}">
            <nuxt-link to="#" class="shadow flex flex-column rounded-10 p-4 h-100">
              <div class="flex-1 flex align-center">
                <img :src="item.img" alt />
              </div>
              <p class="font-bold truncate white-space-no-wrap">{{item.name}}</p>
            </nuxt-link>
          </template>
        </AppSlider>
      </div>
    </div>
    <ProductCategories :items="categories" />
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
import SliderModal from "@/components/Modals/SliderModal";
import Header from "@/components/Header"
export default {
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
    SliderModal,
    Header
  },
  async asyncData({ route, store, params, query }) {
    return {};
  },
  data() {
    return {};
  },
  computed: {
    productImages() {
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
    categories() {
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
    similarItems() {
      return [
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/product-file/81d253831a8461b279215ee5b281cb140095e80f.jpg",
          name: "Резина для морских",
          price: "65 злотых",
          delivery: "24",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/product-file/81d253831a8461b279215ee5b281cb140095e80f.jpg",
          name: "Резина для морски asdd as dsad sad sa sa",
          price: "65 злотых",
          delivery: "24",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/product-file/81d253831a8461b279215ee5b281cb140095e80f.jpg",
          name: "Резина для морских",
          price: "65 злотых",
          delivery: "24",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/product-file/81d253831a8461b279215ee5b281cb140095e80f.jpg",
          name: "Резина для морских",
          price: "65 злотых",
          delivery: "24",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/product-file/81d253831a8461b279215ee5b281cb140095e80f.jpg",
          name: "Резина для морских",
          price: "65 злотых",
          delivery: "24",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/product-file/81d253831a8461b279215ee5b281cb140095e80f.jpg",
          name: "Резина для морских",
          price: "65 злотых",
          delivery: "24",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/product-file/81d253831a8461b279215ee5b281cb140095e80f.jpg",
          name: "Резина для морских",
          price: "65 злотых",
          delivery: "24",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/product-file/81d253831a8461b279215ee5b281cb140095e80f.jpg",
          name: "Резина для морских",
          price: "65 злотых",
          delivery: "24",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/product-file/81d253831a8461b279215ee5b281cb140095e80f.jpg",
          name: "Резина для морских",
          price: "65 злотых",
          delivery: "24",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/product-file/81d253831a8461b279215ee5b281cb140095e80f.jpg",
          name: "Резина для морских",
          price: "65 злотых",
          delivery: "24",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/product-file/81d253831a8461b279215ee5b281cb140095e80f.jpg",
          name: "Резина для морских",
          price: "65 злотых",
          delivery: "24",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/product-file/81d253831a8461b279215ee5b281cb140095e80f.jpg",
          name: "Резина для морских",
          price: "65 злотых",
          delivery: "24",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/product-file/81d253831a8461b279215ee5b281cb140095e80f.jpg",
          name: "Резина для морских",
          price: "65 злотых",
          delivery: "24",
        },
      ];
    },
    similarCategories() {
      return [
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/category-image-b95c44c4ad17aa52b4471a7f007824fae0b3d321.jpg",
          name: "Бутылки с водой",
        },
        {
          img:
            "https://cdn.wonder.pl/cdn-cgi/image/width=300,height=300,quality=85,format=auto/category-image-01059c8c76a7aba4920ba6b2f6dc409432cdc96b.jpg",
          name: "Бутылки ",
        },
      ];
    },
    name() {
      return "Тренировочная резинка Power Band GT by Tiguar уровень 3 оливковый";
    },
    price() {
      return "400";
    },
    currency() {
      return "рублей";
    },
    priceWithCurrency() {
      return this.price + " " + this.currency;
    },
    brandImage() {
      return "https://cdn.wonder.pl/cdn-cgi/image/width=88,height=88,quality=85,format=auto/manufacturer/b59bf0599981f8f0f3466acc754347c9af69fbbf.jpg";
    },
    description() {
      return `
        <div class="text-14">
          <p
            class="mt-3"
          >Специальные каучуки, подготовленные в сотрудничестве с Якубом Подгорски, создателем концепции GT. Это чрезвычайно прочные каучуки, которые используются не только в этом виде тренировок, но и в комплексной спортивной (моторной) подготовке. Благодаря четырем уровням сопротивления их можно легко выбрать в зависимости от потребностей тренирующегося и уровня подготовки. Их инновация заключается в новаторской системе маркировки степени сопротивления резины, которая показывает, сколько силы еще нужно приложить для оптимального растяжения во время упражнения.</p>
          <div class="mt-4">
            <p>1-й уровень сопротивления - слива;</p>
            <p>2 уровень сопротивления - море;</p>
            <p>3 уровень устойчивости - оливковый;</p>
            <p>Уровень сопротивления 4 - серый.</p>
          </div>
          <div class="mt-4">
            <p>Растяжка силового диапазона:</p>
            <p>- удлинение на 50% - 4 кг;</p>
            <p>- 100% удлинение - 8 кг;</p>
            <p>- удлинение на 200% - 15 кг.</p>
          </div>
        </div>`;
    },
    deliveryText() {
      return "Ради высочайшего качества обслуживания клиентов и безопасности продукции мы доставляем посылки только в сотрудничестве с опытными и профессиональными курьерскими компаниями, работающими по всей Польше. Мы также ввели возможность доставки с залогом, которая совершенно бесплатна для заказов на сумму более 499 злотых. В результате выбранная мебель, светильники или аксессуары могут быть доставлены в указанное место независимо от этажа, на котором расположена квартира, и без дополнительных затрат.";
    },
  },
  methods: {
    test() {},
    goBack() {},
    makeFavourite() {},
    addToCart() {},
    openSliderModal(startIdx) {
      this.$modal.show("slider-modal", { items: this.productImages, initialSlide: startIdx  });
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