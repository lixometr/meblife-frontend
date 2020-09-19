<template>
  <div class="module-wrapper">
    <component :is="componentName" :item="componentProps"></component>
  </div>
</template>

<script>
import Modules from "@/components/Modules/";

export default {
  inheritAttrs: false,
  props: {
    module_id: Number,
    module_items: {
      type: Array,
      default: () => [],
    },
    main_image: Object,
    module_images: {
      type: Array,
      default: () => [],
    },
    module_files: {
      type: Array,
      default: () => [],
    },
    sort_order: [String, Number],
    cuntdown_start_at: String,
    cuntdown_end_at: String,
    title: String,
    sub_title: String,
    description: String,
    more_btn: String,
    more_btn_url: String,
    show_type: String
  },
  components: {
    ...Modules,
  },

  computed: {
    moduleId() {
      return this.module_id;
    },
    componentProps() {
      return {
        ...this.$props,
      };
    },
    componentName() {
      const names = {};
      new Array(40).fill(1).forEach((item, idx) => (names[idx.toString()] = `Module${idx}`));
      const id = this.moduleId;
      return names[id.toString()];
    },
  },
};
</script>

<style lang="scss" >
</style>