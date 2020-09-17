<template>
  <div class="similar-inspirations-slider">
    <InspirationsSlider :items="items"/>
  </div>
</template>

<script>

export default {
    props: {
        items: {
            type: Array,
            default: () => ([])
        }
    },
    components: {
    }
};
</script>

<style lang="scss">

</style>