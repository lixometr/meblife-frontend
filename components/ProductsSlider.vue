<template>
  <div class="products-slider">
    <AppSlider
      :items="items"
      :options="{slidesPerView: 'auto',spaceBetween: 30}"
      :slideClass="['slide-width']"
    >
      <template v-slot:slide="{item}">
        <nuxt-link
          :to="$url.product(item.slug)"
          class="bg-white h-100 shadow rounded-10 p-3 flex flex-column"
        >
          <div class="p-5 flex-1">
            <div class="position-relative h-100">
              <AppImage class="size-contain absolute-full" v-bind="item.default_image"  />
            </div>
          </div>
          <div class="text-14">
            <div class="truncate white-space-no-wrap">
              <b>{{item.full_name}}</b>
            </div>
            <div>
              <span>{{item.price}} {{currency}}</span>
            </div>
            <div v-if="item.delivery_days || item.delivery_24">
              <span key="24" v-if="item.deivery_24" class="color-green">{{$t('delivery24')}}</span>
              <span key="no24" v-else>{{item.delivery_days}} {{sclonDays(item.delivery_days)}}</span>
            </div>
          </div>
        </nuxt-link>
      </template>
    </AppSlider>
  </div>
</template>

<script>
import { wordForm } from "@/helpers/functions";
export default {
  props: {
    items: Array,
  },
  computed: {
    sclonDays() {
      return (days) => {
          return wordForm(days, this.$t('daySclon'))
      };
    },
    currency() {
      return this.$store.getters.currency
    }
  },
};
</script>

<style lang="scss" >
</style>