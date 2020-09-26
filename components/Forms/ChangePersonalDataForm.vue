<template>
  <form action="#" @submit.prevent="onSubmit">
    <AuthInput
      type="text"
      :label="$t('changePersonalData.inputName')"
      class="mb-4"
      :error="nameError"
      v-model="name"
    />
    <AuthInput
      :label="$t('changePersonalData.inputPhone')"
      class="mb-4"
      :error="phoneError"
      v-model="phone"
    />

    <button type="submit" class="btn btn-black btn-md w-100 font-bold">
      {{ $t("changePersonalData.btn") }}
    </button>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, minLength, phone } = require("vuelidate/lib/validators");
export default {
  mixins: [validationMixin],
  validations: {
    name: {
      required,
    },
    phone: {
      
    },
  },
  data() {
    return {
      isSubmited: false,
      phone: this.$store.getters['user/user'].phone,
      name: this.$store.getters['user/user'].name,
    };
  },
  computed: {
    phoneError() {
      if (!this.isSubmited || !this.$v.phone.$error) return;
      if (!this.$v.phone.required) {
        return this.$t("formErrors.required");
      }
      if (!this.$v.phone.phone) {
        return this.$t("formErrors.email");
      }
    },

    nameError() {
      if (!this.isSubmited || !this.$v.name.$error) return;
      if (!this.$v.name.required) {
        return this.$t("formErrors.required");
      }
    },
  },
  methods: {
    async onSubmit() {
      this.isSubmited = true;
      this.$v.$touch();
      if (this.$v.$invalid) return;
      try {
        const result = await this.$api.$put("userInfo", null, {
          phone: this.phone,
          name: this.name,
        });
        if (result.error) {
          this.$toast.global.appError({
            message: this.$t("errors." + result.errorCode),
          });
          this.$emit("error");
        }
        if (result.ok) {
          this.$toast.global.appSuccess({
            message: this.$t("changePersonalData.success"),
          });
          this.$emit("success");
          await this.$store.dispatch('user/init')
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