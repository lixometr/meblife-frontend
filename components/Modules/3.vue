<template>
  <Module id="3">
    <div class="flex md-column" :class="{'flex-row-reverse': showType === 'reverse'}">
      <div class="module-3__content flex-1 pr-3 pl-3">
        <nuxt-link :to="moreBtnUrl">
          <h2 class="h3" v-if="title">{{title}}</h2>
        </nuxt-link>
        <div class="pt-1 pb-4" v-if="subTitle">{{subTitle}}</div>
        <AppDescription class="text-14 text-justify" :text="description" v-if="description"></AppDescription>
        <div class="mt-6">
          <nuxt-link :to="moreBtnUrl" class="btn btn-grey btn-md module-3__btn">{{moreBtn}}</nuxt-link>
        </div>
      </div>
      <nuxt-link :to="moreBtnUrl" class="d-block module-3__image position-relative flex-1">
        <AppImage cover v-bind="mainImage" alt="test" hide />
      </nuxt-link>
    </div>
    <div class="mt-4">
      <ModuleSlider :items="moduleItems" v-if="moduleItems.length > 0" />
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
  mounted() {
    console.log(this.item);
  },
  computed: {},
};
</script>

<style lang="scss" >
.module-3 {
  &__image {
    @include md {
      order: 1;
      margin-bottom: 1rem;
    }
  }
  &__content {
    @include md {
      order: 2;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
  }
  &__btn {
    @include md {
      width: 100%;
    }
  }
}
</style>