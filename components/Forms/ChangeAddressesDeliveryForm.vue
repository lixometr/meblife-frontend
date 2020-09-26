<template>
  <form action="#" @submit.prevent="submit">
    <AuthInput
      type="text"
      :label="$t('changeAddressesDelivery.inputName')"
      class="mb-4"
      :error="nameError"
      v-model="name"
    />
    <AuthInput
      :label="$t('changeAddressesDelivery.inputAddress')"
      class="mb-4"
      :error="addressError"
      v-model="address"
    />
    <AuthInput
      :label="$t('changeAddressesDelivery.inputPostalCode')"
      class="mb-4"
      :error="postalCodeError"
      v-model="postalCode"
    />
    <AuthInput
      :label="$t('changeAddressesDelivery.inputCity')"
      class="mb-4"
      :error="cityError"
      v-model="city"
    />
    <AuthInput
      :label="$t('changeAddressesDelivery.inputPhone')"
      class="mb-4"
      :error="phoneError"
      v-model="phone"
    />
    <AuthInput
      :label="$t('changeAddressesDelivery.inputNote')"
      class="mb-4"
      :error="noteError"
      v-model="note"
    />

    <!-- <div class="flex align-center flex-wrap">
      {{ $t("changeAddressesDelivery.inputDefault") }}:
      <AppSwitcher class="ml-2" v-model="isDefault" />
    </div> -->
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, minLength, numeric } = require("vuelidate/lib/validators");
export default {
  mixins: [validationMixin],
  validations: {
    name: {
      required,
    },
    phone: {
      required,
      numeric,
      minLength: minLength(7),
    },
    address: {
      required,
    },
    postalCode: {
      required,
      numeric,
    },
    city: {
      required,
    },
    note: {},
  },
  props: {
    isNew: {
      type: Boolean,
      default: false,
    },
    id: String,
  },
  data() {
    return {
      isSubmited: false,
      name: "",
      phone: "",
      address: "",
      postalCode: "",
      city: "",
      note: "",
      // isDefault: false,
    };
  },
  async fetch() {
    await this.$store.dispatch("user/init");
    if (!this.isNew) {
      const address = this.items.find((addr) => addr._id === this.id) || {};
      this.name = address.name;
      this.phone = address.phone;
      this.address = address.address;
      this.postalCode = address.postal_code;
      this.city = address.city;
      this.note = address.note;
      // this.isDefault = address.is_default;
    }
  },
  computed: {
    items() {
      return this.$store.getters["user/user"].delivery_addresses || [];
    },
    nameError() {
      if (!this.isSubmited || !this.$v.name.$error) return;
      if (!this.$v.name.required) {
        return this.$t("formErrors.required");
      }
    },

    phoneError() {
      if (!this.isSubmited || !this.$v.phone.$error) return;
      if (!this.$v.phone.required) {
        return this.$t("formErrors.required");
      }
      if (!this.$v.phone.numeric) {
        return this.$t("formErrors.correct");
      }
      if (!this.$v.phone.minLength) {
        return this.$t("formErrors.correct");
      }
    },
    addressError() {
      if (!this.isSubmited || !this.$v.address.$error) return;
      if (!this.$v.address.required) {
        return this.$t("formErrors.required");
      }
    },
    postalCodeError() {
      if (!this.isSubmited || !this.$v.postalCode.$error) return;
      if (!this.$v.postalCode.required) {
        return this.$t("formErrors.required");
      }
      if (!this.$v.postalCode.numeric) {
        return this.$t("formErrors.correct");
      }
    },
    cityError() {
      if (!this.isSubmited || !this.$v.city.$error) return;
      if (!this.$v.city.required) {
        return this.$t("formErrors.required");
      }
    },
    noteError() {
      if (!this.isSubmited || !this.$v.note.$error) return;
      if (!this.$v.note.required) {
        return this.$t("formErrors.required");
      }
    },
    itemIndex() {
      return this.items.findIndex((addr) => addr._id === this.id);
    },
  },
  methods: {
    async submit() {
      this.isSubmited = true;
      this.$v.$touch();
      if (this.$v.$invalid) return;
      try {
        const item = {
          name: this.name,
          phone: this.phone,
          address: this.address,
          postal_code: this.postalCode,
          city: this.city,
          note: this.note
          // is_default: this.isDefault,
        };
        let newItems = [...this.items];
        if (this.isNew) {
          newItems.push(item);
        } else {
          const idx = this.itemIndex;
          if (idx < 0) return;
          newItems[idx] = item;
        }

        const result = await this.$api.$put(
          "deliveryAddresses",
          null,
          newItems
        );
        if (result.error) {
          this.$toast.global.appError({
            message: this.$t("errors." + result.errorCode),
          });
          this.$emit("error");
        }
        if (result.ok) {
          this.$toast.global.appSuccess({
            message: this.$t("changeAddressesDelivery.success"),
          });
          this.$emit("success");
          await this.$store.dispatch("user/init");
        }
      } catch (err) {
        this.$error(err);
      }
    },
    async removeAddress() {
      try {
        const newItems = this.items.filter((item) => item._id !== this.id);

        const result = await this.$api.$put(
          "deliveryAddresses",
          null,
          newItems
        );
        if (result.error) {
          this.$toast.global.appError({
            message: this.$t("errors." + result.errorCode),
          });
          this.$emit("error");
        }
        if (result.ok) {
          this.$toast.global.appSuccess({
            message: this.$t("changeAddressesDelivery.success"),
          });
          this.$emit("success");
          await this.$store.dispatch("user/init");
        }
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>