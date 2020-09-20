<template>
  <div class="page">
    <Header class="default-header" variant="dark" />
    <div class="page-header">
      <AppImage v-bind="headerImage" class="page-header__image" />
      <div class="image-placeholder"></div>
      <div class="page-header__content">
        <div class="flex flex-column h-100">
          <div class="page-header__title flex-1 flex align-center justify-center flex-column">
            <h1
              class="mw-100 truncate pl-3 pr-3 mb-3 uppercase color-white text-center"
            >{{pageName}}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="page-content">
      <div class="container">
        <ModuleGroupsArea :moduleGroups="moduleGroups" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.pageName,
    };
  },
  async asyncData({ error, $api, params, store }) {
    try {
      const page = await $api.$get("page", { slug: params.slug });
      const moduleGroups = await store.dispatch(
        "fetchModuleGroups",
        page.module_groups
      );
      return {
        page,
        moduleGroups,
      };
    } catch (err) {
      error();
    }
  },
  data() {
    return {};
  },
  computed: {
    pageName() {
      return this.page.name;
    },
    headerImage() {
      return this.page.header_image;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>