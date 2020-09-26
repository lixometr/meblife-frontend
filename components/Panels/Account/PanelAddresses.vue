<template>
  <Panel
    name="panel-account.addresses"
    headerTheme="light"
    class="panel-account-addresses"
    closeType="back"
    @close="$emit('close')"
  >
    <template #title>{{ $t("panelAdresses.panelTitle") }}</template>
    <template #content>
      <div class="panel-modal__content">
        <div
          class="icon-link"
          v-for="(link, idx) in links"
          :key="idx"
          @click="openLink(link.action)"
        >
          <component :is="link.icon" width="18" class="mr-2" />
          {{ $t("panelAdresses.links." + link.action) }}
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import svgDoc from "@/assets/icons/doc.svg";
import svgDelivery from "@/assets/icons/delivery.svg";
export default {
  data() {
    return {
      links: [
        {
          icon: "svgDoc",
          action: "billing",
        },
        {
          icon: "svgDelivery",
          action: "delivery",
        },
      ],
    };
  },

  components: {
    svgDoc,
    svgDelivery,
  },
  methods: {
    openLink(action) {
      if (action === "billing") {
        this.$store.dispatch("modal/open", {
          name: "panel-account.addressesInvoice",
        });
      }
      if (action === "delivery") {
        this.$store.dispatch("modal/open", {
          name: "panel-account.addressesDelivery",
        });
      }
    },
  },
};
</script>

<style lang="scss" >
</style>