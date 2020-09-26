<template>
  <main>
    <TopBar class="top-bar" />
    <Logo class="top-logo" />
    <Nuxt :key="nuxtKey" />
    <Footer class="mt-6" />
    <LoadingModal v-if="$store.getters.isLoading" />
  </main>
</template>
<script>
import Header from "@/components/Header";
import TopBar from "@/components/Header/TopBar";
import Footer from "@/components/Footer";
export default {
  components: {
    Header,
    Footer,
    TopBar,
  },
  async mounted() {
    await this.$nextTick();
    const { panel } = this.$route.query;
    if (panel) {
      this.$store.dispatch("modal/open", { name: "panel-" + panel });
    }
  },

  computed: {
    nuxtKey() {
      return this.$store.getters.nuxtKey;
    },
  },
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
