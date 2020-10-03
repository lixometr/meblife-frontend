<template>
  <div>
    <h3>{{ $t("searchPage.categories") }}</h3>
    <AppSlider :items="items" height="100px" :options="{slidesPerView: 'auto'}">
      <template #slide="{ item }">
        <div class="btn btn-grey btn-md">
          <AppImage
            v-bind="item.image"
            contain
            :style="{ width: '50px' }"
            noBg
          />
          <div class="uppercase font-bold ml-1">{{ item.name }}</div>
        </div>
      </template>
    </AppSlider>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
};
</script>

<style lang="scss">
</style>