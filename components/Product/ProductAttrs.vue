<template>
  <div class="product-attrs flex flex-wrap text-14">
    <div class="mb-5 pl-3 pr-3 product-attr">
      <h4 class="product-attr__title mb-2 capitalize font-normal">Общее</h4>
      <div class="product-attr__items">
        <div class="product-attr__item flex" v-for="(attr, idx) in common" :key="idx">
          <span class="flex-1">{{attr.name}}:</span>
          <span class="flex-1">
            <nuxt-link :to="attr.slug " v-if="attr.slug">{{attr.value}}</nuxt-link>
            <span v-else>{{attr.value}}</span>
          </span>
        </div>
      </div>
    </div>
    <div class="mb-5 pl-3 pr-3 product-attr" v-for="(attr, idx) in items" :key="idx">
      <h4 class="product-attr__title mb-2 capitalize font-normal">{{attr.name}}</h4>
      <div class="product-attr__items">
        <div
          class="product-attr__item flex"
          v-for="(sub_attr, index) in attr.attributes"
          :key="index"
        >
          <span class="flex-1">{{sub_attr.name}}:</span>
          <span class="flex-1">
            <nuxt-link :to="sub_attr.slug " v-if="sub_attr.slug">{{sub_attr.value}}</nuxt-link>
            <span v-else>{{sub_attr.slug}}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
  <!-- /.prdocut-attrs -->
</template>

<script>
export default {
  props: {
    items: Array,
    common: Array,
  },
};
</script>

<style lang="scss" >
</style>