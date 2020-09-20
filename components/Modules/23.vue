<template>
  <Module id="23">
    <h2 class="text-24 font-bold uppercase" v-if="title">{{title}}</h2>
    <p v-if="subTitle">{{subTitle}}</p>
    <div class="mt-3" v-if="moduleImages.length > 0">
        <div class="module-23__item flex align-center pt-3 pb-3 pl-4 pr-4 bg-pale" v-for="(item, idx) in moduleImages" :key="item._id">
            <div class="module-23__item-image">
                <div class="module-23__item-number text-18 font-bold mr-3">
                    {{idx + 1}}.
                </div>
            </div>
            <div class="module-23__item-content ">
                <div class="text-18 font-bold uppercase">{{item.title}}</div> 
            </div>
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
.module-23 {
    &__item-number {
        width: 35px;
        height: 35px;
        background: $red;
        color: $white;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
    }
    &__item {
        color: rgb(66, 66, 66);
        line-height: 1.6;
    }
}
</style>