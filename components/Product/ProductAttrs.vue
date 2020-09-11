<template>
  <div class="product-attrs flex flex-wrap text-14">
    <div class="mb-5 pl-3 pr-3 product-attr">
      <h4 class="product-attr__title mb-2 capitalize font-normal">Общее</h4>
      <div class="product-attr__items">
        <div class="product-attr__item flex" v-for="(attr, idx) in common" :key="idx">
          <span class="flex-1">{{attr.name}}:</span>
          <span class="flex-1">
            <nuxt-link :to="attr.full_slug " v-if="attr.slug">{{attr.value}}</nuxt-link>
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
          <span class="flex-1">{{sub_attr.name.name}}:</span>
          <span class="flex-1">
            <template v-if="sub_attr.name.attribute_type !== 'decimal'">
              <nuxt-link
                v-for="(value, idx) in sub_attr.value"
                :to="$url.filter(categorySlug, sub_attr.name.slug, value.slug) "
                class="mr-2"
                :key="idx"
              >{{value.name}}</nuxt-link>
            </template>
            <span v-else>{{sub_attr.value[0] && sub_attr.value[0].name}}</span>
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
    categorySlug: String
  },
};
</script>

<style lang="scss" >
</style>