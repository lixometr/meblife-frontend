<template>
  <Module id="8">
    <div
      class="flex md-column bg-pale module-8__wrapper"
      :class="{'flex-row-reverse': showType === 'reverse'}"
    >
      <div class="module-8__image flex-1">
        <AppImage class="h-100" v-bind="mainImage" cover hide />
      </div>
      <div class="module-8__content flex flex-column justify-center text-md-center flex-1">
        <div class="pl-4 pl-md-0 pt-3 pb-3">
          <h2 class="text-24 module-8__title mb-1 font-bold uppercase" v-if="title">{{title}}</h2>
          <div class="text-14" v-if="subTitle">{{subTitle}}</div>
          <AppDescription class="text-14 pt-2" v-if="description" :text="description"></AppDescription>
        </div>
      </div>
    </div>
  </Module>
</template>

<script>
import moduleValidator from "./moduleValidator";
import ModuleMixin from "./ModuleMixin";
// showType: reverse | normal
export default {
  props: {
    item: moduleValidator,
  },
  mixins: [ModuleMixin],
};
</script>

<style lang="scss">
.module-8 {
  &__wrapper {
    min-height: 33rem;
  }
  &__title {
    // color: rgb(66, 66, 66);
  }
}
</style>