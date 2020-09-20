<template>
  <Module id="19">
    <div class="module-19__wrapper">
      <div class="module-19__item bg-grey mt-3" v-for="item in moduleImages" :key="item._id">
        <AppCollapse>
          <template #trigger="{open}">
            <div class="uppercase text-18 flex align-center user-select-none p-4 cursor-pointer">
                <span>{{item.title}}</span> <svgArrowDown class="ml-auto transition shrink-0" :class="{'rotate-180': open}" width="20"/>
            </div>
          </template>
          <template #content>
            <div class="flex md-column p-3">
              <AppImage  class="module-19__image" v-bind="item.image" v-if="item.image && item.image.url"/>
              <div >
                  <div v-if="item.sub_title">{{item.sub_title}}</div>
                  <AppDescription class="text-14" :text="item.description"></AppDescription>
              </div>
            </div>
          </template>
        </AppCollapse>
      </div>
    </div>
  </Module>
</template>

<script>
import moduleValidator from "./moduleValidator";
import ModuleMixin from "./ModuleMixin";
import svgArrowDown from "@/assets/icons/arrow-down-triangle.svg";

// Аккордион
export default {
  props: {
    item: moduleValidator,
  },
  components: {
    svgArrowDown,
  },
  mixins: [ModuleMixin],
  mounted() {
    console.log(this.item);
  },
  computed: {},
};
</script>

<style lang="scss" >
.module-19 {
  &__image {
    max-width: 250px;
    margin-right: 0.5em;
    @include md {
        margin-right: 0;
        max-width: 100%;
    }
  }

}
</style>