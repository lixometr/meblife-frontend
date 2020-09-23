<template>
  <Panel
    name="panel-product-preview"
    headerTheme="light"
    class="panel-product-preview"
    @before-open="beforeOpen"
  >
    <template v-slot:title>
      <div class="text-14 uppercase">{{$t('fastView')}}</div>
    </template>
    <template v-slot:headerButtons>
      <div
        class="panel-product-preview__favourite flex align-center justify-center btn btn-circle mr-2"
        :class="{'is-favourite bg-black color-white': isFavourite}"
        @click="toggleFavourite"
      >
        <svgLike width="20" />
      </div>
    </template>
    <template v-slot:content>
      <div class="panel-product-preview__content flex-1">
        <div class="h-100 flex align-center justify-center" v-if="isLoading">
          <Loader  />
        </div>
        <div class v-else>
          <AppSlider
            :items="productImages"
            height="300px"
            :arrowPrevClass="['hidden']"
            :arrowNextClass="['hidden']"
            class="panel-product-preview__slider"
            v-show-slide="!showAttrs"
          >
            <template v-slot:slide="{item, idx}">
              <AppImage
                v-bind="item"
                class="size-contain no-bg cursor-pointer"
                @click="openSliderModal(idx)"
              />
            </template>
          </AppSlider>
          <div class="panel-product-preview__characters pt-5">
            <div class="panel-product-preview__infos">
              <div
                class="panel-product-preview__info text-14 pl-3 pr-3 pt-1 pb-1"
                v-for="(info, idx) in itemInfos"
                :key="idx"
                :class="{'bg-grey': !(idx & 1)}"
              >
                <div class="flex">
                  <div class="flex-1">{{info.name}}</div>
                  <div class="flex-1" v-if="!info.full_slug">{{info.value}}</div>
                  <nuxt-link :to="info.full_slug" class="flex-1" v-else>{{info.value}}</nuxt-link>
                </div>
              </div>
            </div>
            <div class="panel-product-preview__attrs" v-show-slide="showAttrs">
              <div
                class="panel-product-preview__attr text-14 pl-3 pr-3 pt-1 pb-1"
                v-for="(attr, idx) in attributes"
                :key="idx"
                :class="{'bg-grey': !(idx & 1)}"
              >
                <div class="flex">
                  <div class="flex-1">{{attr.name.name}}</div>
                  <div class="flex-1 flex flex-wrap">
                    <template v-if="attr.name.attribute_type !== 'decimal'">
                      <nuxt-link
                        :to="$url.filter(product.primary_category.slug, attr.name.slug, value.slug)"
                        v-for="(value, idx) in attr.value"
                        :key="idx"
                      >{{value.name}}</nuxt-link>
                    </template>
                    <template v-else>
                      <span
                        :to="$url.filter(product.primary_category.slug, attr.name.slug, value.slug)"
                        class="flex-1"
                        v-for="(value, idx) in attr.value"
                        :key="idx"
                      >{{value.name}}</span>
                    </template>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white pt-2">
              <div
                class="text-center text-14 underline cursor-pointer pb-3 flex justify-center"
                @click="toggleAttrs"
              >
                {{$t('showDetails')}}
                <ArrowDown
                  width="23"
                  class="ml-1 color-black transition"
                  :class="{'rotate-180': showAttrs}"
                />
              </div>
            </div>
          </div>

          <div class="bg-grey pt-4 pl-2 pr-2 pb-2">
            <nuxt-link
              :to="$url.product(product.slug)"
              class="btn btn-md btn-red uppercase w-100"
            >{{$t('visitProductPage')}}</nuxt-link>
            <div
              class="mb-3 color-orange uppercase font-bold text-14 mt-7 pl-1"
              v-if="similarItems.length > 0"
            >{{$t('similarProducts')}}</div>
            <div
              class="flex flex-wrap panel-product-preview__similar-items"
              v-if="similarItems.length > 0"
            >
              <nuxt-link
                :to="$url.product(item.slug)"
                class="panel-product-preview__similar-item"
                v-for="(item, idx) in similarItems"
                :key="idx"
              >
                <span class="p-4 rounded-10">
                  <img class="size-contain no-bg" :src="item.default_image.url" alt />
                </span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import svgLike from "@/assets/icons/heart-stroke.svg";
import Loader from "@/components/Loader";
import AppSlider from "@/components/AppSlider";
import ArrowDown from "@/assets/icons/arrow-down-sm.svg";
export default {
  components: {
    Panel,
    svgLike,
    Loader,
    AppSlider,
    ArrowDown,
  },
  data() {
    return {
      params: {},
      isLoading: true,
      product: {},
      showAttrs: false,
      similarItems: [],
    };
  },
  computed: {
    isFavourite() {
      return this.$store.getters["favourite/isFavourite"](this.product._id);
    },
    itemInfos() {
      return [
        {
          name: this.$t("productName"),
          value: this.product.full_name,
        },
        {
          name: this.$t("filters.price"),
          value: this.product.price + " " + this.$store.getters.currency,
        },
        {
          name: this.$t("filters.manufacturer"),
          value: this.product.manufacturer.name,
          slug: this.product.manufacturer.slug,
          full_slug: this.$url.manufacturer(this.product.manufacturer.slug),
        },
        {
          name: this.$t("sku"),
          value: this.product.sku,
        },
      ];
    },
    attributes() {
      const attrs = this.product.attributes.reduce((arr, attr, idx) => {
        return arr.concat(attr.attributes);
      }, []);
      console.log(this.product.attributes);
      return attrs;
    },
    productImages() {
      return this.product.product_images || [];
    },
    id() {
      return this.params.id;
    },
  },
  methods: {
    toggleAttrs() {
      this.showAttrs = !this.showAttrs;
    },
    openSliderModal(idx) {
      this.$store.dispatch("modal/open", {
        name: "slider-modal",
        props: {
          initialSlide: idx,
          items: this.productImages,
        },
      });
    },
    async toggleFavourite() {
      this.$store.dispatch("favourite/toggle", { id: this.product._id });
    },
    async beforeOpen({ params }) {
      this.params = params;
      this.isLoading = true;
      await this.fetchProduct();
      this.isLoading = false;
    },
    async fetchSimilarProducts() {
      try {
        this.similarItems =
          (await this.$api.$get("similarProductItems", {
            slug: this.params.slug,
          })) || [];
        console.log(this.similarItems);
      } catch (err) {
        this.$error(err);
      }
    },
    async fetchProduct() {
      try {
        this.product = await this.$api.$get("product", {
          slug: this.params.slug,
        });
        await this.fetchSimilarProducts();
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
.panel-product-preview {
  &__content {
    overflow-y: auto;
    max-height: 100%;
  }

  .panel-modal__modal {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }
  &__favourite.is-favourite {
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
  &__similar-item {
    height: 9rem;
    width: 50%;
    cursor: pointer;
    padding: 0.25rem;
    span {
      display: block;
      width: 100%;
      height: 100%;
      background: $white;
      transition: $transition;

      &:hover {
        background: $pale;
      }
    }
  }
}
</style>