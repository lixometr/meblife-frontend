<template>
  <main>
    <TopBar class="top-bar" />
    <Logo class="top-logo" />
    <Nuxt />
    <Footer class="mt-6" />
    <SearchModal />
    <MenuModal />
  </main>
</template>
<script>
import Header from "@/components/Header";
import TopBar from "@/components/Header/TopBar";
import Footer from "@/components/Footer";
import SearchModal from "@/components/Modals/SearchModal";
import MenuModal from "@/components/Modals/MenuModal";
export default {
  components: {
    Header,
    Footer,
    TopBar,
    SearchModal,
    MenuModal
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
