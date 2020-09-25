<template>
  <Panel
    name="panel-installments"
    headerTheme="dark"
    class="panel-installments"
    :isStatic="false"
    @close="$emit('close')"
  >
    <template v-slot:title>{{ $t("panelInstallments.panelTitle") }}</template>
    <template v-slot:content>
      <div class="panel-installments__content panel-modal__content p-4">
        <h5 class="pb-4">{{ $t("panelInstallments.title") }}</h5>
        <p class="text-14">{{ $t("panelInstallments.subTitle") }}</p>
        <div class="panel-installments__list mt-3">
          <div class="bg-pale border-bottom border-white p-4 flex">
            <div
              class="panel-installments__icon bg-orange color-white p-1 shrink-0 mr-2"
            >
              <svgCheckmark width="35" />
            </div>
            <p class="text-14">
              {{ $t("panelInstallments.text[0]") }}
            </p>
          </div>
          <div class="bg-pale border-bottom border-white p-4 flex">
            <div
              class="panel-installments__icon bg-orange color-white p-1 shrink-0 mr-2"
            >
              <svgCheckmark width="35" />
            </div>
            <p class="text-14">
              {{ $t("panelInstallments.text[1]") }}
            </p>
          </div>
          <div class="bg-pale border-bottom border-white p-4 flex">
            <div
              class="panel-installments__icon bg-orange color-white p-1 shrink-0 mr-2"
            >
              <svgCheckmark width="35" />
            </div>
            <p class="text-14">
              {{ $t("panelInstallments.text[2]") }}
            </p>
          </div>
          <div class="bg-pale border-bottom border-white p-4 flex">
            <div
              class="panel-installments__icon bg-orange color-white p-1 shrink-0 mr-2"
            >
              <svgCheckmark width="35" />
            </div>
            <p class="text-14">
              {{ $t("panelInstallments.text[3]") }}
            </p>
          </div>
        </div>
        <div
          class="btn btn-black w-100 pt-3 pb-3 font-bold mt-3"
          @click="openPanelContact"
        >
          {{ $t("panelInstallments.btnText") }}
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import svgCheckmark from "@/assets/icons/checkmark.svg";
export default {
  components: {
    Panel,
    svgCheckmark,
  },
  data() {
    return {
      tabActive: 1,
    };
  },
  methods: {
    openPanelContact() {
      this.$store.dispatch("modal/closeAll");
      this.$store.dispatch("modal/open", { name: "panel-contact" });
    },
    selectTab(id) {
      this.tabActive = id;
    },
  },
};
</script>

<style lang="scss">
.panel-installments {
  &__icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
}
</style>