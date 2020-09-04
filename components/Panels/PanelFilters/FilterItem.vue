<template>
  <div class="panel-filters__item">
    <AppCollapse v-if="itemType === 'decimal'" key="isDecimal">
      <template v-slot:trigger>
        <div class="panel-filters__item-name cursor-pointer">{{item.name.name}}</div>
      </template>
      <template v-slot:content>
        <!-- Range Slider -->
        <div class="panel-filters__item-content pl-3 pr-5 pb-4 pt-2">
          <div class="panel-filters__item-inputs flex mb-3">
            <div class="panel-filters__item-input mr-3">
              <span class="text-12">{{$t('from')}}</span>
              <input
                type="text"
                class="pt-4 pl-4 pr-2 pb-2 text-16 bg-pale"
                v-model="itemValue[0]"
              />
            </div>
            <div class="panel-filters__item-input">
              <span class="text-12">{{$t('to')}}</span>
              <input
                type="text"
                class="pt-4 pl-3 pr-2 pb-2 text-16 bg-pale "
                v-model="itemValue[1]"
              />
            </div>
          </div>

          <client-only>
            <VueRangeSlider
              :dotSize="24"
              :height="3"
              :dotStyle="{backgroundColor: '#000'}"
              :stepStyle="{backgroundColor: '#e5e5e5'}"
              :processStyle="{backgroundColor: '#000'}"
              :tooltip="'none'"
              :enableCross="false"
              :min="sliderOpts.min"
              :max="sliderOpts.max"
              v-model="itemValue"
            />
          </client-only>
        </div>
      </template>
    </AppCollapse>
    <div key="isPanelOpen" v-else>
      <div class="panel-filters__item-name cursor-pointer" @click="openFilterSubPanel">
        <div>{{item.name.name}}</div>
      </div>
      <div class="panel-filters__item-values flex text-14" v-if="value.length > 0">
        <div
          class="panel-filters__item-value bg-grey flex flex-wrap align-center mr-2 mb-2"
          v-for="(attrVal, idx) in value"
          :key="idx"
        >
          {{attrVal.name}}
          <svgClose width="18" class="cursor-pointer ml-1" @click="removeFilterValue(attrVal)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueRangeSlider from "vue-slider-component/dist-css/vue-slider-component.umd.min.js";
import "vue-slider-component/dist-css/vue-slider-component.css";
// import theme
import "vue-slider-component/theme/default.css";
import svgClose from "@/assets/icons/close.svg";
import _ from "lodash";
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    VueRangeSlider,
    svgClose,
  },
  model: {
    event: "change",
    props: "value",
  },
  data() {
    return {
      sliderOpts: {},
    };
  },
  beforeMount() {
    if (this.itemType === "decimal") {
      let min = this.itemValue[0];
      let max = this.itemValue[1];
      this.sliderOpts = {
        min,
        max,
      };
    }
  },
  computed: {
    itemType() {
      return this.item.name.type;
    },
    itemValue: {
      get() {
        if (this.itemType === "decimal") {
          if (_.isEmpty(this.value)) {
            return this.item.value.map((val) => parseInt(val));
          }
          return this.value.map((val) => parseInt(val));
        }
        if (_.isEmpty(this.value)) {
          return [];
        }
        return this.value;
      },
      set(val) {
        this.$emit("change", val);
      },
    },
    isCollapseOpen() {
      return !_.isEmpty(this.value);
    },
  },
  methods: {
    removeFilterValue(attrVal) {
      this.itemValue = this.itemValue.filter(
        (item) => item.slug !== attrVal.slug
      );
    },
    openFilterSubPanel() {
      this.$store.dispatch("modal/open", {
        name: "panel-sub-filters",
        props: {
          items: this.item.value,
          title: this.item.name.name,
          value: this.value,
          change: (data) => {
            console.log("oh data", data);
            this.itemValue = data;
          },
        },
      });
    },
  },
};
</script>

<style lang="scss">
</style>