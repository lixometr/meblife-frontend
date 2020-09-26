<template>
  <Panel
    name="panel-account.addressesInvoice"
    headerTheme="light"
    class="panel-account-addresses-invoice"
    closeType="back"
    @close="$emit('close')"
  >
    <template #title>{{ $t("panelAddressesInvoice.panelTitle") }}</template>
    <template #content>
      <div
        class="panel-modal__content flex align-stretch flex-column justify-start"
      >
        <div class="p-3 flex-1">
          <div
            class="shadow rounded-10 flex"
            v-for="(address, idx) in addresses"
            :key="idx"
          >
            <div class="btn btn-circle" @click="removeAddress(address._id)">
              <svgDelete width="20" />
            </div>
            {{ address.company }}
          </div>
        </div>
        <div class="panel-modal__footer border-top border-grey p-3">
          <div class="flex">
            <div class="btn btn-white btn-md mr-2" @click="$emit('close')">
              {{ $t("panelAddressesInvoice.btns.back") }}
            </div>
            <div class="btn btn-green btn-md flex-1 font-bold" @click="addAddress">
              {{ $t("panelAddressesInvoice.btns.add") }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import svgDelete from "@/assets/icons/trash.svg";
import svgPencil from "@/assets/icons/pencil.svg";
export default {
  data() {
    return {};
  },
  computed: {
    addresses() {
      return this.$store.getters["user/user"].invoice_addresses;
    },
  },
  components: {},
  methods: {
    addAddress() {
      this.$store.dispatch('modal/open', {name: 'panel-account.changeAddressesInvoice', props: {isNew: true}})
    },
    removeAddress(id) {
      // this.$api.$delete('userAddress')
    },
  },
};
</script>

<style lang="scss" >
</style>