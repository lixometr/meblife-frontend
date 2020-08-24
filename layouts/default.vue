<template>
  <main>
    <TopBar class="top-bar" />
    <Logo class="top-logo" />
    <Nuxt />
    <Footer class="mt-6" />
    <PanelContact />
    <PanelInstallments />
    <SearchModal />
  </main>
</template>
<script>
import Header from "@/components/Header";
import TopBar from "@/components/Header/TopBar";
import Footer from "@/components/Footer";
import PanelContact from "@/components/Panels/PanelContact";
import PanelInstallments from "@/components/Panels/PanelInstallments";
import SearchModal from "@/components/Modals/SearchModal";
export default {
  components: {
    Header,
    Footer,
    TopBar,
    PanelContact,
    PanelInstallments,
    SearchModal
  },
  async mounted() {
    await this.$nextTick();
    const {panel} = this.$route.query;
    this.$modal.show('panel-'+panel)

  },
  get() {
    axios.get('/category/123')
  }
};
</script>
<style lang="scss">
.default-header {
  position: absolute;
  padding-top: $top_bar_offset;
  width: 100%;
  top: 0;
  z-index: 5;
}
.top-bar {
  z-index: 6;
  position: relative;
}
</style>
