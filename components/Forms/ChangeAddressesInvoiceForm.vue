<template>
  <form action="#" @submit.prevent="submit">
    <AuthInput
      type="text"
      :label="$t('changeAddressesInvoice.inputCompany')"
      class="mb-4"
      :error="companyError"
      v-model="company"
    />
    <AuthInput
      :label="$t('changeAddressesInvoice.inputNip')"
      class="mb-4"
      :error="nipError"
      v-model="nip"
    />
    <AuthInput
      :label="$t('changeAddressesInvoice.inputPhone')"
      class="mb-4"
      :error="phoneError"
      v-model="phone"
    />
    <AuthInput
      :label="$t('changeAddressesInvoice.inputAddress')"
      class="mb-4"
      :error="addressError"
      v-model="address"
    />
    <AuthInput
      :label="$t('changeAddressesInvoice.inputPostalCode')"
      class="mb-4"
      :error="postalCodeError"
      v-model="postalCode"
    />
    <AuthInput
      :label="$t('changeAddressesInvoice.inputCity')"
      class="mb-4"
      :error="cityError"
      v-model="city"
    />
    <div class="flex align-center flex-wrap">
      {{ $t("changeAddressesInvoice.inputDefault") }}:
      <AppSwitcher class="ml-2" v-model="isDefault" />
    </div>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, minLength, numeric } = require("vuelidate/lib/validators");
export default {
  mixins: [validationMixin],
  validations: {
    company: {
      required,
    },
    nip: {
      required,
      numeric,
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
  },
  data() {
    return {
      isSubmited: false,
      company: "",
      nip: "",
      phone: "",
      address: "",
      postalCode: "",
      city: "",
      isDefault: false,
    };
  },
  computed: {
    companyError() {
      if (!this.isSubmited || !this.$v.company.$error) return;
      if (!this.$v.company.required) {
        return this.$t("formErrors.required");
      }
    },
    nipError() {
      if (!this.isSubmited || !this.$v.nip.$error) return;
      if (!this.$v.nip.required) {
        return this.$t("formErrors.required");
      }
      if (!this.$v.nip.numeric) {
        return this.$t("formErrors.correct");
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
  },
  methods: {
    async submit() {
      this.isSubmited = true;
      this.$v.$touch();
      if (this.$v.$invalid) return;
      try {
        const result = await this.$api.$put("userInvoice", null, {
          company: this.company,
          nip: this.nip,
          phone: this.phone,
          address: this.address,
          postalCode: this.postalCode,
          city: this.city,
          isDefault: this.isDefault,
        });
        if (result.error) {
          this.$toast.global.appError({
            message: this.$t("errors." + result.errorCode),
          });
          this.$emit("error");
        }
        if (result.ok) {
          this.$toast.global.appSuccess({
            message: this.$t("changeAddressesInvoice.success"),
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