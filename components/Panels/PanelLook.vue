<template>
  <Panel
    name="panel-look"
    headerTheme="dark"
    class="panel-look"
    @before-open="beforeOpen"
    :isStatic="false"
    @close="$emit('close')"
  >
    <template v-slot:title>
      <div class="btn btn-circle btn-white" @click="openModal">
        <svgZoom width="28" />
      </div>
    </template>
    <template v-slot:content>
      <div class="panel-look-content">
        <div class="panel-look__image cursor-pointer" @click="openModal" >
          <img :src="item.image.url" alt />
        </div>
        <h6 class="mt-2 mb-2 uppercase text-center" >Соответствующие продукты</h6>
        <div class="panel-look__products flex flex-wrap">
          <div class="panel-look__product" v-for="(product, idx) in products" :key="idx">
            <nuxt-link :to="$url.product(product.slug)" class="bg-grey rounded-10 p-6 " >
              <img class="no-bg size-contain w-100 h-100" :src="product.default_image.url" alt />
            </nuxt-link>
          </div>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import svgZoom from "@/assets/icons/zoom.svg";
export default {
  components: {
    Panel,
    svgZoom,
  },
  data() {
    return {
      params: {},
      item: {
        image: {
          url:
            "https://cdn.wonder.pl/cdn-cgi/image/width=650,height=650,quality=85,format=auto/inspirationImage/inspirationImage20190207-20547-c6sv1k.jpg",
        },
        name: "Look 1",
        products: [
          {
            _id: "1",
            name: "product 1",
            default_image: {
              url:
                "https://cdn.wonder.pl/cdn-cgi/image/width=760,height=760,quality=85,format=auto/productImage/productImage20190206-20586-dcwh3b",
            },
          },
          {
            _id: "1",
            name: "product 1",
            default_image: {
              url:
                "https://cdn.wonder.pl/cdn-cgi/image/width=760,height=760,quality=85,format=auto/productImage/productImage20190206-20586-dcwh3b",
            },
          },
          {
            _id: "1",
            name: "product 1",
            default_image: {
              url:
                "https://cdn.wonder.pl/cdn-cgi/image/width=760,height=760,quality=85,format=auto/productImage/productImage20190206-20586-dcwh3b",
            },
          },
        ],
      },
    };
  },
  computed: {
    products() {
      return this.item.products;
    },
    lookImages() {
      return [this.item.image];
    },
  },
  methods: {
    async beforeOpen({ params }) {
      this.params = params;
      //   await this.loadLook();
    },
    openModal() {
      this.$modal.show("slider-modal", {
        items: this.lookImages,
      });
    },
    async loadLook() {
      try {
        this.item =
          (await this.$api.$get("look", { id: this.params.id })) || {};
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
.panel-look {
  position: relative;
  .panel-title {
    background-color: transparent;
    position: relative;
    z-index: 10;
  }
  &-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  &__product {
    height: 235px;
    width: 50%;
    cursor: pointer;
    display: block;
    padding: 0.5rem;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
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