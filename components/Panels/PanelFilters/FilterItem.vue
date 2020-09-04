<template>
  <div class="panel-filters__item">
    <AppCollapse v-if="item.name.type === 'decimal'" key="isDecimal">
      <template v-slot:trigger>
        <div class="panel-filters__item-name">{{item.name.name}}</div>
      </template>
      <template v-slot:content>
        <!-- Range Slider -->
        <div class="panel-filters__item-content pl-5 pr-5 pb-4 pt-2">
          <!-- <div class="flex">
                  <input type="text" class="pt-4 pl-2 pr-2 pb-2 text-16"/>
                  <input type="text" />
          </div>-->
          <client-only>
            <VueRangeSlider
              :dotSize="24"
              :height="3"
              :dotStyle="{backgroundColor: '#000'}"
              :stepStyle="{backgroundColor: '#e5e5e5'}"
              :processStyle="{backgroundColor: '#000'}"
              :tooltip="'none'"
              :min="item.value[0]"
              :max="item.value[1]"
              v-model="itemValue"
            />
          </client-only>
        </div>
      </template>
    </AppCollapse>
    <div key="isPanelOpen" @click="openFilterSubPanel" v-else>
      <div class="panel-filters__item-name">{{item.name.name}}</div>
    </div>
  </div>
</template>

<script>
import VueRangeSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";

// import theme
import "vue-slider-component/theme/default.css";
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    VueRangeSlider,
  },
  model: {
      event: 'change',
      props: "value"
  },
  computed: {
    itemValue: {
      get() {
          return this.value
      },
      set(val) {
          this.$emit('change', val)
      },
    },
  },
  methods: {
    openFilterSubPanel() {
        this.$store.dispatch('modal/open', {name: "panel-sub-filters", props: {items: this.item.value, title: this.item.name.name}})
    },
  },
};
</script>

<style lang="scss">
</style>