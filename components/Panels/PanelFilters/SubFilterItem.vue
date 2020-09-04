<template>
  <div class="panel-sub-filters__item" >
    <div class="flex justify-between align-center">
      <div class="panel-sub-filters__item-name">{{item.name}}</div>
      <div class="panel-sub-filters__item-checkbox">{{item.name}}</div>
      <AppSwitcher />
    </div>
  </div>
</template>

<script>
export default {
    props: {
        item: Object
    }
};
</script>

<style lang="scss" >
</style>