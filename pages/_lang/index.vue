<template>
  <div class="main-page">
    <Header class="default-header" variant="dark" />
    <div class="page-header">
      <MainPageSlider :items="sliderItems" />
      <!-- <AppImage v-bind="headerImage" class="page-header__image" /> -->
      <!-- <div class="image-placeholder"></div> -->
      <div class="page-header__tabs-wrapper">
        <div class="btn-tabs overflow-auto justify-between mt-auto">
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
    sliderItems() {
      return this.values.slider;
    },
  },
  methods: {
    async fetchModuleGroups() {
      this.isLoading = true;
      try {
        const moduleGroups = await this.$store.dispatch("fetchModuleGroups", {
          moduleGroupIds: this.activeTabItem.module_groups,
          area: "main_page",
        });
        this.moduleGroups = moduleGroups;
      } catch (err) {
        this.$error(err);
      }

      this.isLoading = false;
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
  .page-header__tabs-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: block;
    width: 100%;
  }
}
</style>
