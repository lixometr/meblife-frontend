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
      default: () => [],
    },
    // moduleGroupIds: Array,
    // area: String
  },
  data() {
    return {
      items: []
    }
  },
  async fetch() {
    try {
      return
      this.items = await this.$store.dispatch("fetchModuleGroups", {
        modules: this.moduleGroupIds,
        area: this.area,
      });
    } catch (err) {
      this.$error(err);
    }
  },
};
</script>

<style lang="scss" >
</style>