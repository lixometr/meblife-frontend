<template>
  <div class="product-buttons-info mt-3 mb-3">
    <div class="product-buttons">
      <div class="product-button--desktop md-hidden">
        <div class="container">
          <div class="flex align-center justify-start product__tabs">
            <button
              class="btn btn-grey btn-md mr-2"
              :class="{'active': tabActive === 'description'}"
              @click="openDescription"
            >{{$t('product.tabs.description')}}</button>
            <button class="btn btn-grey btn-md mr-2" @click="instalmentsOpen">{{$t('product.tabs.installments')}}</button>
            <button class="btn btn-grey btn-md mr-2" @click="contactOpen">{{$t('product.tabs.ask')}}</button>
            <button class="btn btn-grey btn-md mr-2" @click="openBrand">{{$t('product.tabs.brand')}}</button>
            <button
              class="btn btn-grey btn-md mr-2"
              :class="{'active': tabActive === 'delivery'}"
              @click="openDeliveryInfo"
            >{{$t('deliveryText')}}</button>
          </div>
          <div class="product__description" v-if="tabActive === 'description'">
            <h5>{{$t('product.info')}} {{name}}</h5>
            <div class="bg-pale p-6 mt-3 text-center" v-if="sizeImage">
              <AppImage v-bind="sizeImage" />
            </div>
            <AppDescription :text="description"></AppDescription>
            <ProductAttrs v-bind="attributes" />
            <ProductDownload class="mt-4" :items="files"/>
          </div>
          <div class="product__delivery-info" v-if="tabActive === 'delivery'">
            <p
              class="text-center"
              style="max-width: 350px"
            >{{$t('product.deliveryText')}}</p>
          </div>
          <!-- /.product__description -->
        </div>
        <!-- /.container -->
      </div>
      <div class="product-buttons--mobile mb-8 md-show">
        <AppCollapse v-model="descriptionCollapseOpen" class="border-bottom border-white">
          <template v-slot:trigger>
            <div class="pr-4 pl-4 pt-3 pb-3 bg-pale no-select cursor-pointer flex">
              <span class="flex-1">{{$t('product.tabs.description')}}</span>
              <ArrowDown
                class="transition"
                :class="{'rotate-180': descriptionCollapseOpen}"
                width="30"
              />
            </div>
          </template>
          <template v-slot:content>
            <div class="pl-4 pt-4 bg-pale">
              <div class="bg-pale p-4 text-center" v-if="sizeImage && sizeImage.url ">
                <AppImage v-bind="sizeImage" />
              </div>
              <AppDescription :text="description"></AppDescription>
              <ProductAttrs v-bind="attributes" />
              <ProductDownload class="mt-4" :items="files" />
            </div>
          </template>
        </AppCollapse>
        <AppCollapse v-model="brandCollapseOpen" class="border-bottom border-white">
          <template v-slot:trigger>
            <div class="pr-4 pl-4 pt-3 pb-3 bg-pale no-select cursor-pointer flex">
              <span class="flex-1">{{$t('product.tabs.brand')}}</span>
              <ArrowDown class="transition" :class="{'rotate-180': brandCollapseOpen}" width="30" />
            </div>
          </template>
          <template v-slot:content>
            <div class="pl-2 pt-4 bg-pale"></div>
          </template>
        </AppCollapse>
        <AppCollapse v-model="deliveryCollapseOpen" class="border-bottom border-grey">
          <template v-slot:trigger>
            <div class="pr-4 pl-4 pt-3 pb-3 bg-pale cursor-pointer flex">
              <span class="flex-1 no-select">{{$t('product.tabs.delivery')}}</span>
              <ArrowDown
                class="transition"
                :class="{'rotate-180': deliveryCollapseOpen}"
                width="30"
              />
            </div>
          </template>
          <template v-slot:content>
            <div class="pl-5 pt-4 pr-5 pb-4 bg-pale">
              <div class="text-center" style="max-width: 350px">{{delivery}}</div>
            </div>
          </template>
        </AppCollapse>
        <div
          class="pr-4 pl-4 pt-3 pb-3 bg-white border-bottom border-grey cursor-pointer flex"
          @click="deliveryOpen"
        >
          <span class="flex-1 no-select text-14">{{$t('product.tabs.delivery')}}</span>
          <ArrowRight width="30" />
        </div>
        <div
          class="pr-4 pl-4 pt-3 pb-3 bg-white border-bottom border-grey cursor-pointer flex"
          @click="instalmentsOpen"
        >
          <span class="flex-1 no-select text-14">{{$t('product.tabs.installments')}}</span>
          <ArrowRight width="30" />
        </div>
        <div
          class="pr-4 pl-4 pt-3 pb-3 bg-white border-bottom border-grey cursor-pointer flex"
          @click="contactOpen"
        >
          <span class="flex-1 no-select text-14">{{$t('product.tabs.ask')}}</span>
          <ArrowRight width="30" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppCollapse from "@/components/AppCollapse";
import ArrowDown from "@/assets/icons/arrow-down-triangle.svg";
import ArrowRight from "@/assets/icons/arrow-right.svg";
export default {
  components: {
    AppCollapse,
    ArrowDown,
    ArrowRight,
  },
  async mounted() {
    // await this.$nextTick()
  },
  props: {
    product: Object,
  },
  data() {
    return {
      tabActive: "description",
      descriptionCollapseOpen: false,
      deliveryCollapseOpen: false,
      brandCollapseOpen: false,
    };
  },
  computed: {
    files() {
      return this.product.product_files || []
    },
    name() {
      return this.product.full_name;
    },
    description() {
      return this.product.description;
    },
    delivery() {
      return `Ради высочайшего качества обслуживания клиентов и безопасности продукции мы доставляем посылки только в сотрудничестве с опытными и профессиональными курьерскими компаниями, работающими по всей Польше. Мы также ввели возможность доставки с залогом, которая совершенно бесплатна для заказов на сумму более 499 злотых. В результате выбранная мебель, светильники или аксессуары могут быть доставлены в указанное место независимо от этажа, на котором расположена квартира, и без дополнительных затрат.`;
    },

    sizeImage() {
      return this.product.size_image;
    },
    attributes() {
      return {
        common: [
          {
            name: "Производитель",
            value: this.product.manufacturer.name,
            slug: this.product.manufacturer.slug,
            full_slug: this.$url.manufacturer(this.product.manufacturer.slug),
          },
          { name: "Код товара", value: this.product.sku },
        ],
        items: this.product.attributes,
        categorySlug: this.product.primary_category.slug,
      };
    },
  },
  methods: {
    openDescription() {
      this.tabActive = "description";
    },
    openDeliveryInfo() {
      this.tabActive = "delivery";
    },
    instalmentsOpen() {
      this.$store.dispatch("modal/open", { name: "panel-installments" });

      // this.$modal.show("panel-installments");
    },
    openBrand() {
      this.$router.push(this.$url.manufacturer(this.product.manufacturer.slug));
    },
    deliveryOpen() {},
    contactOpen() {
      this.$store.dispatch("modal/open", { name: "panel-contact" });
    },
  },
};
</script>

<style lang="scss">
</style>