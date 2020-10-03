<template>
  <Module id="2">
    <div
      class="flex md-column"
      :class="{ 'flex-row-reverse': showType === 'reverse' }"
    >
      <div class="module-2__content flex-1 flex flex-column pr-3 pl-3">
        <div class="shrink-0 flex-1">
          <nuxt-link :to="moreBtnUrl">
            <h2 class="h3" v-if="title">{{ title }}</h2>
          </nuxt-link>
          <div class="pt-1 pb-4" v-if="subTitle">{{ subTitle }}</div>
          <AppDescription
            class="text-14 text-justify"
            :text="description"
            v-if="description"
          ></AppDescription>
          <div class="mt-6">
            <nuxt-link
              :to="moreBtnUrl"
              class="btn btn-grey btn-md module-2__btn"
              >{{ moreBtn }}</nuxt-link
            >
          </div>
        </div>
        <div class="flex-1 module-2__items-wrapper mt-3">
          <div class="flex flex-wrap module-2__items overflow-auto">
            <div
              class="module-2__item p-1"
              v-for="item in moduleItems"
              :key="item._id"
            >
              <nuxt-link
                :to="itemLink(item)"
                class="bg-grey flex flex-column align-center p-3 w-100 h-100"
              >
                <div class="module-2__item-image flex-1 mb-2">
                  <AppImage
                    noBg
                    contain
                    absoluteFull
                    v-bind="itemImage(item)"
                  />
                </div>
                <div class="text-14 mt-auto font-bold truncate mw-100">
                  {{ itemName(item) }}
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
      <nuxt-link
        :to="moreBtnUrl"
        class="d-block module-2__image position-relative flex-1"
      >
        <AppImage cover v-bind="mainImage" alt="test" hide />
      </nuxt-link>
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

  computed: {},
};
</script>

<style lang="scss" >
.module-2 {
  &__item {
    width: 33%;
    &-image {
      position: relative;
      width: 100%;
      height: 100px;
      min-height: 100px;
    }
  }
  &__items-wrapper {
    min-height: 250px;
    position: relative;
  }
  &__items {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

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