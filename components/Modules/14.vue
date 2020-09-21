<template>
  <Module id="14">
    <h2 class="text-24 font-bold uppercase" v-if="title">{{title}}</h2>
    <div class="mt-2" v-if="subTitle">{{subTitle}}</div>
    <div class="module-slider position-relative mt-4">
      <client-only>
        <div class="overflow-hidden position-relative h-100 module-slider__wrapper">
          <AppSlider
            class="position-absolute w-100 pt-2 pb-2"
            :options="sliderOptions"
            :arrowPrevClass="['hidden']"
            :arrowNextClass="['hidden']"
            :slideClass="['slide-width']"
            :paginationClass="['module-slider-pagination']"
            :items="moduleItems"
          >
            <template #slide="{item}">
              <nuxt-link
                :to="itemLink(item)"
                class="bg-white h-100 shadow rounded-10 p-3 flex flex-column"
              >
                <div class="p-5 flex-1">
                  <div class="position-relative h-100">
                    <AppImage class="size-contain absolute-full" v-bind="itemImage(item)" />
                  </div>
                </div>
                <div class="text-14">
                  <div class="truncate white-space-no-wrap">
                    <b>{{itemName(item)}}</b>
                  </div>
                  <div v-if="item.item.price">
                    <span>{{item.item.price}} {{currency}}</span>
                  </div>
                  <!-- <template v-if="item.item.del"> -->
                  <div v-if="item.item.delivery_days || item.item.delivery_24">
                    <span
                      key="24"
                      v-if="item.item.deivery_24"
                      class="color-green"
                    >{{$t('delivery24')}}</span>
                    <span
                      key="no24"
                      v-else
                    >{{item.item.delivery_days}} {{sclonDays(item.item.delivery_days)}}</span>
                  </div>
                  <!-- </template> -->
                </div>
              </nuxt-link>
            </template>
          </AppSlider>
        </div>
        <button
          class="slider-arrow slider-arrow-prev module-slider-arrow-prev"
          :class="'module-slider-arrow-prev-' + _uid"
        >
          <svgArrowRight class="arrow-left" width="35" />
        </button>
        <button
          class="slider-arrow slider-arrow-next module-slider-arrow-next"
          :class="'module-slider-arrow-next-' + _uid"
        >
          <svgArrowRight width="35" />
        </button>
      </client-only>
    </div>
  </Module>
</template>

<script>
import moduleValidator from "./moduleValidator";
import ModuleMixin from "./ModuleMixin";
import svgArrowRight from "@/assets/icons/arrow-right.svg";
import { wordForm } from "@/helpers/functions";

export default {
  props: {
    item: moduleValidator,
  },
  components: {
    svgArrowRight,
  },
  mixins: [ModuleMixin],
  computed: {
    sliderOptions() {
      return {
        slidesPerView: "auto",
        spaceBetween: 30,
        navigation: {
          nextEl: ".module-slider-arrow-next-" + this._uid,
          prevEl: ".module-slider-arrow-prev-" + this._uid,
        },
      };
    },
    currency() {
      return this.$store.getters.currency;
    },
    sclonDays() {
      return (days) => {
        return wordForm(days, this.$t("daySclon"));
      };
    },
  },
};
</script>

<style lang="scss">
.module-14 {
  .module-slider {
    height: 420px;
  }
}
</style>