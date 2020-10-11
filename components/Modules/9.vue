<template>
  <Module id="9">
    <div class="module-9__wrapper">
      <h2 class="module-9__title text-center">
        {{ title }}
      </h2>
      <ModuleSlider class="mt-6" :items="moduleItems" v-if="moduleItems.length > 0" />
        <div class="mt-6 flex justify-center" v-if="moreBtn">
          <nuxt-link :to="moreBtnUrl || '#'" class="btn btn-md btn-grey">
            {{moreBtn}}
          </nuxt-link>
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
.module-9 {
  &__wrapper {
    padding: 2rem;
    border: 1px solid $grey;
  }
}
</style>