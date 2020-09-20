<template>
  <Module id="35" :style="{height: height + 'px'}"></Module>
</template>

<script>
import moduleValidator from "./moduleValidator";
import ModuleMixin from "./ModuleMixin";
export default {
  props: {
    item: moduleValidator,
  },
  mixins: [ModuleMixin],
  computed: {
    height() {
      let height = 80
      if(this.title) {
        const newHeight = parseInt(this.title)
        if(!isNaN(newHeight)) height = newHeight
      }
      return height
    }
  }
};
</script>

<style lang="scss" >
</style>