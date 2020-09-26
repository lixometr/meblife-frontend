<template>
  <Panel
    name="panel-account.changeAddressesDelivery"
    headerTheme="light"
    class="panel-account-change-addresses-delivery"
    closeType="back"
    @close="$emit('close')"
  >
    <template #title>{{
      $t("panelChangeAddressesDelivery.panelTitle")
    }}</template>
    <template #content>
      <div
        class="panel-modal__content flex align-stretch flex-column justify-start"
      >
        <div class="p-3 flex-1">
          <ChangeAddressesDeliveryForm :isNew="isNew" :id="id" ref="changeForm" @success="$emit('close')"/>
        </div>
        <div class="panel-modal__footer border-top border-grey p-3">
          <div class="flex">
            <div class="btn btn-red btn-md mr-2" @click="removeAddress">
              {{ $t("panelChangeAddressesDelivery.btns.delete") }}
            </div>
            <div class="btn btn-green btn-md flex-1 font-bold" @click="save">
              <span v-if="isNew">{{ $t("panelChangeAddressesDelivery.btns.add") }}</span>
              <span v-else>{{ $t("panelChangeAddressesDelivery.btns.save") }}</span>
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
    removeAddress() {
      this.$refs.changeForm.removeAddress()
    },
  },
};
</script>

<style lang="scss" >
</style>