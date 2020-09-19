<template>
  <div v-if="moduleGroups.length > 0">
    <ModulesArea
      v-for="moduleGroup in moduleGroups"
      :key="moduleGroup._id"
      v-bind="moduleGroup"
    />
  </div>
</template>

<script>
export default {
    props: {
        moduleGroups: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="scss" >
</style>