<template>
  <Panel
    name="panel-account.changeAddressesInvoice"
    headerTheme="light"
    class="panel-account-change-addresses-invoice"
    closeType="back"
    @close="$emit('close')"
  >
    <template #title>{{
      $t("panelChangeAddressesInvoice.panelTitle")
    }}</template>
    <template #content>
      <div
        class="panel-modal__content flex align-stretch flex-column justify-start"
      >
        <div class="p-3 flex-1">
          <ChangeAddressesInvoiceForm ref="changeForm" @success="$emit('close')"/>
        </div>
        <div class="panel-modal__footer border-top border-grey p-3">
          <div class="flex">
            <div class="btn btn-white btn-md mr-2" @click="$emit('close')">
              {{ $t("panelChangeAddressesInvoice.btns.delete") }}
            </div>
            <div class="btn btn-green btn-md flex-1 font-bold" @click="save">
              {{ $t("panelChangeAddressesInvoice.btns.save") }}
            </div>
          </div>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
export default {
  props: {
    isNew: {
      type: Boolean,
      default: false,
    },
    id: String,
  },
  data() {
    return {};
  },
  computed: {},
  components: {},
  methods: {
    async save() {
      this.$refs.changeForm.submit();
    },
    removeAddress(id) {},
  },
};
</script>

<style lang="scss" >
</style>