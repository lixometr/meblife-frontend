<template>
  <Panel
    name="panel-account"
    headerTheme="light"
    class="panel-account"
    :isStatic="false"
    @close="$emit('close')"
  >
    <template #title>
        {{$t('accountText')}}
    </template>
    <template #content></template>
  </Panel>
</template>

<script>
export default {};
</script>

<style lang="scss" >
</style>