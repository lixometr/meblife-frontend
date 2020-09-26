<template>
  <Panel
    name="panel-account.addressesDelivery"
    headerTheme="light"
    class="panel-account-addresses-delivery"
    closeType="back"
    @close="$emit('close')"
  >
    <template #title>{{ $t("panelAddressesDelivery.panelTitle") }}</template>
    <template #content>
      <div
        class="panel-modal__content flex align-stretch flex-column justify-start"
      >
        <div class="p-3 flex-1 addresses-delivery__items">
          <div
            class="shadow rounded-10 addresses-delivery__item mb-3"
            v-for="address in addresses"
            :key="address._id"
          >
            <div class="p-3 addresses-delivery__item-text">
              <b
                >{{ $t("changeAddressesDelivery.inputName") }}:
                {{ address.name }}}</b
              >
            </div>
            <div class="p-3 addresses-delivery__item-text">
              <b
                >{{ $t("changeAddressesDelivery.inputAddress") }}:
                {{ address.address }}}</b
              >
            </div>
            <div class="p-3 addresses-delivery__item-text">
              <b
                >{{ $t("changeAddressesDelivery.inputPostalCode") }}:
                {{ address.postal_code }}}</b
              >
            </div>
            <div class="p-3 addresses-delivery__item-text">
              <b
                >{{ $t("changeAddressesDelivery.inputCity") }}:
                {{ address.city }}}</b
              >
            </div>
            <div class="p-3 addresses-delivery__item-text">
              <b
                >{{ $t("changeAddressesDelivery.inputPhone") }}:
                {{ address.phone }}}</b
              >
            </div>
            <div class="p-3 addresses-delivery__item-text">
              <b
                >{{ $t("changeAddressesDelivery.inputNote") }}:
                {{ address.note }}}</b
              >
            </div>
            <div class="flex justify-between p-3">
              <div class="btn btn-circle" @click="removeAddress(address._id)">
                <svgDelete width="20" />
              </div>
              <div class="btn btn-circle" @click="editAddress(address._id)">
                <svgPencil width="20" />
              </div>
            </div>
          </div>
        </div>
        <div class="panel-modal__footer border-top border-grey p-3">
          <div class="flex">
            <div class="btn btn-white btn-md mr-2" @click="$emit('close')">
              {{ $t("panelAddressesDelivery.btns.back") }}
            </div>
            <div
              class="btn btn-green btn-md flex-1 font-bold"
              @click="addAddress"
            >
              {{ $t("panelAddressesDelivery.btns.add") }}
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
      return this.$store.getters["user/user"].delivery_addresses;
    },
  },
  components: {
    svgDelete,
    svgPencil,
  },
  methods: {
    addAddress() {
      this.$store.dispatch("modal/open", {
        name: "panel-account.changeAddressesDelivery",
        props: { isNew: true },
      });
    },
    editAddress(id) {
      this.$store.dispatch("modal/open", {
        name: "panel-account.changeAddressesDelivery",
        props: { isNew: false, id },
      });
    },
    async removeAddress(id) {
      const newItems = this.addresses.filter((addr) => addr._id !== id);
      await this.$api.$put("deliveryAddresses", null, newItems);
      await this.$store.dispatch("user/init");
    },
  },
}
</script>

<style lang="scss" >
.addresses-delivery__item {
  &-text {
    border-bottom: 1px dashed $grey;
  }
}
</style>