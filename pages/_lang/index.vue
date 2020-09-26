<template>
  <div class="main-page">
    <Header class="default-header" variant="dark" />
    <div class="page-header">
      <AppImage v-bind="headerImage" class="page-header__image" />
      <div class="image-placeholder"></div>
      <div class="page-header__content">
        <div class="flex flex-column h-100">
          <div
            class="page-header__title flex-1 flex align-center justify-center flex-column"
          >
            <h1
              class="mw-100  pl-3 pr-3  uppercase color-white text-center"
            >
              {{ pageName }}
            </h1>
            <p class="mt-1 color-white text-18 mb-4" v-if="subTitle">{{ subTitle }}</p>
            <nuxt-link
              class="btn btn-red font-bold btn-md mt-1"
              :to="moreBtnUrl"
              v-if="moreBtn"
            >
              {{ moreBtn }}
            </nuxt-link>
          </div>
          <div class="btn-tabs overflow-auto justify-between">
            <div
              class="btn-tab mr-2 shrink-0"
              exact-active-class="active"
              :class="{ active: activeTab === idx }"
              v-for="(tab, idx) in tabs"
              :key="idx"
              @click="selectTab(idx)"
            >
              <div class="btn pl-3 pr-3 btn-blur font-bold">
                <span class="truncate">{{ tab.tab_name }}</span>
              </div>
            </div>
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
  async fetch() {
    await this.fetchModuleGroups();
  },
  async asyncData({ error, $api, params, store, $loader }) {
    $loader.start();
    try {
      const page = await $api.$get("widgetByName", { name: "main_page" });
      $loader.stop();

      return {
        page,
        moduleGroups: [],
      };
    } catch (err) {
      $loader.stop();

      error();
    }
  },
  data() {
    return {
      activeTab: 0,
    };
  },
  computed: {
    subTitle() {
      return this.texts.sub_title;
    },
    moreBtnUrl() {
      return this.texts.more_btn_url || "#";
    },
    moreBtn() {
      return this.texts.more_btn;
    },
    tabs() {
      return this.values.tabs;
    },
    values() {
      return this.page.values || {};
    },
    texts() {
      return this.page.texts || {};
    },
    headerImage() {
      return this.values.bg_image;
    },
    pageName() {
      return this.texts.title;
    },
    activeTabItem() {
      return this.values.tabs[this.activeTab];
    },
  },
  methods: {
    async fetchModuleGroups() {
      const moduleGroups = await this.$store.dispatch(
        "fetchModuleGroups",
        this.activeTabItem.module_groups
      );
      this.moduleGroups = moduleGroups;
    },
    selectTab(idx) {
      this.activeTab = idx;
    },
  },
  watch: {
    activeTab() {
      this.fetchModuleGroups();
    },
  },
};
</script>

<style lang="scss">
.main-page {
  h1 {
    font-size: 3rem;
    line-height: 1.4;
  }
}
</style>
