<template>
  <Module id="21">
    <div class="module-21__wrapper p-5">
      <div class="module-21__title font-bold text-16 uppercase bg-white" v-if="title">{{title}}</div>
      <div class="module-21__content text-justify">
        <AppDescription :text="description" v-if="description"></AppDescription>
      </div>
    </div>
  </Module>
</template>

<script>
import moduleValidator from "./moduleValidator";
import ModuleMixin from "./ModuleMixin";
export default {
  props: {
    item: moduleValidator,
  },
  mixins: [ModuleMixin],
};
</script>

<style lang="scss">
.module-21 {
  &__wrapper {
    border: 4px solid $orange;
    position: relative;
  }
  &__title {
    position: absolute;
    top: -2px;
    transform: translateY(-50%);
    padding-left: .75rem;
    padding-right: .75rem;
    margin-left: -.75rem;
  }
}
</style>