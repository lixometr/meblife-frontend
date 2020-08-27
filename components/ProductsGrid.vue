<template>
  <div class="products-grid">
    <div class="products-grid__wrapper flex flex-wrap">
      <ProductsGridItem
        class="products-grid__item"
        v-for="product in products"
        :key="product._id"
        :item="product"
      />
    </div>
  </div>
</template>

<script>
import ProductsGridItem from "@/components/ProductsGridItem";
export default {
  components: {
    ProductsGridItem,
  },
  props: {
    items: Array,
  },
  computed: {
    products() {
      return [
        {
          _id: "1",
          name: "Product 1",
          price: "200",
          oldPrice: "300",
          delivery: "21",
          defaultImage: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=760,height=760,quality=85,format=auto/productImage/productImage20190206-20586-dcwh3b",
          },
        },
        {
          _id: "2",
          name: "Product 1",
          price: "200",
          oldPrice: "300",
          delivery: "5",
          defaultImage: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=760,height=760,quality=85,format=auto/productImage/productImage20190206-20586-dcwh3b",
          },
        },
        {
          _id: "3",
          name: "Product 1",
          price: "200",
          oldPrice: "300",
          delivery: "3",
          defaultImage: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=760,height=760,quality=85,format=auto/productImage/productImage20190206-20586-dcwh3b",
          },
        },
        {
          _id: "4",
          name: "Product 1",
          price: "200",
          oldPrice: "300",
          delivery: "3",
          defaultImage: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=760,height=760,quality=85,format=auto/productImage/productImage20190206-20586-dcwh3b",
          },
        },
        {
          _id: "5",
          name: "Product 1",
          price: "200",
          oldPrice: "300",
          delivery: "3",
          defaultImage: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=760,height=760,quality=85,format=auto/productImage/productImage20190206-20586-dcwh3b",
          },
        },
        {
          _id: "6",
          name: "Product 1",
          price: "200",
          oldPrice: "300",
          delivery: "3",
          defaultImage: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=760,height=760,quality=85,format=auto/productImage/productImage20190206-20586-dcwh3b",
          },
        },
      ];
      //   return this.items;
    },
  },
};
</script>

<style lang="scss">
.products-grid {
  &__wrapper {
    width: 100%;
    margin-left: -0.5rem;
    margin-right: -0.5rem;
  }
  &__item {
    width: 33.3333%;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    margin-bottom: 2rem;
    @include md {
      width: 50%;
    }
  }
}
</style>