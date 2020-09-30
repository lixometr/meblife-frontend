<template>
  <div>
    <div class="flex justify-center">
      <div
        class="btn btn-md no-select align-center uppercase pl-3"
        :class="{'btn-black cursor-pointer': hasPrev, 'bg-grey cursor-default': !hasPrev}"
        @click="prev"
      >
        <svgArrowRight class="rotate-180" width="25" />
        {{$t('pagination.prev')}}
      </div>
      <AppSelect class="ml-2 mr-2" v-model="activePage" :options="selectOptions">
        <template #trigger>{{activePage}} {{$t('iz')}} {{totalPages}}</template>
      </AppSelect>
      <div
        class="btn btn-md no-select align-center uppercase pr-3"
        :class="{'btn-black cursor-pointer': hasNext, 'bg-grey cursor-default': !hasNext}"
        @click="next"
      >
        {{$t('pagination.next')}}
        <svgArrowRight width="25" />
      </div>
    </div>
  </div>
</template>

<script>
import svgArrowRight from "@/assets/icons/arrow-right.svg";

export default {
  props: {
    totalPages: Number,
    value: [Number, String],
  },
  components: {
    svgArrowRight,
  },
  computed: {
    hasNext() {
      if (this.activePage >= this.totalPages) return false;
      return true;
    },
    hasPrev() {
      if (this.activePage <= 1) return false;

      return true;
    },
    selectOptions() {
      const options = [];
      for (let i = this.totalPages; i > 0; i--) {
        options.unshift(i);
      }
      return options;
    },
  },
  data() {
    return {
      activePage: this.value,
    };
  },
  created() {
    this.initValue();
  },
  methods: {
    initValue() {
      const numVal = parseInt(this.value);
      if (isNaN(numVal)) {
        this.activePage = 1;
      } else {
        this.activePage = numVal;
      }
    },
    next() {
      if (this.activePage >= this.totalPages) {
        this.activePage = this.totalPages;
        return;
      }
      this.activePage++;
    },
    prev() {
      if (this.activePage <= 1) {
        this.activePage = 1;
        return;
      }
      this.activePage--;
    },
  },
  watch: {
    value() {
      this.initValue();
    },
    activePage() {
      this.$emit("input", this.activePage);
    },
  },
};
</script>

<style lang="scss" >
</style>