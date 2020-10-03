<template>
  <div class="region-switcher text-12">
    <div class="flex align-center">
      <div class="mr-2"><svgGlobe width="15" /> {{ $t("topBar.region") }}:</div>
      <AppSelect
        class="region-switcher__select"
        :options="options"
        v-model="activeRegion"
      />
    </div>
  </div>
</template>

<script>
import svgGlobe from "@/assets/icons/globe.svg";
export default {
  components: {
    svgGlobe,
  },
  data() {
    return {
      options: ["г. Одесса", "г. Киев"],
      activeRegion: "г. Одесса",
    };
  },
};
</script>

<style lang="scss" >
.region-switcher {
  &__select {
    .app-select__trigger {
      min-width: 100px;
      padding: 0;
      background: transparent;
      border: none;
      color: inherit;
      justify-content: flex-start;
      &:hover {
        background: transparent;
      }
    }
  }
}
</style>