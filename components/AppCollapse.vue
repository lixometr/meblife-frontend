<template>
  <div class="app-collapse">
    <div class="app-collapse__trigger" @click="collapseToggle">
      <slot name="trigger" :open="isActive"></slot>
    </div>
    <div v-show-slide:[duration]="isActive">
      
      <slot name="content" :open="isActive"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: String,
      default: '300',
    },
  },
  data() {
    return {
      isActive: this.value,
    };
  },
  methods: {
    open() {
      this.isActive = true;
    },
    close() {
      this.isActive = false;
    },
    collapseToggle() {
      if (this.isActive) {
        this.$emit("close");
        this.close();
      } else {
        this.$emit("open");
        this.open();
      }
      this.$emit("input", this.isActive);
    },
  },
  watch: {
    value(val) {
      this.isActive = val;
    },
  },
};
</script>

<style lang="scss" >
</style>