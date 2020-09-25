<template>
  <form action="#" @submit.prevent="onSubmit">
    <AuthInput
      type="text"
      :label="$t('changeEmail.inputEmail')"
      class="mb-4"
      :error="emailError"
      v-model="email"
    />
    <AuthInput
      type="password"
      :label="$t('changeEmail.inputPassword')"
      class="mb-4"
      :error="passwordError"
      v-model="password"
    />

    <button type="submit" class="btn btn-black btn-md w-100 font-bold">
      {{ $t("changeEmail.btn") }}
    </button>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, minLength, email } = require("vuelidate/lib/validators");
export default {
  mixins: [validationMixin],
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    };
  },
  data() {
    return {
      isSubmited: false,
      password: "",
      email: ''
    };
  },
  computed: {
    passwordError() {
      if (!this.isSubmited || !this.$v.password.$error) return;
      if (!this.$v.password.required) {
        return this.$t("formErrors.required");
      }
    },
    
    emailError() {
      if (!this.isSubmited || !this.$v.email.$error) return;
      if (!this.$v.email.required) {
        return this.$t("formErrors.required");
      }
      if (!this.$v.email.email) {
        return this.$t("formErrors.email");
      }
    },
  },
  methods: {
    async onSubmit() {
      this.isSubmited = true;
      this.$v.$touch();
      if (this.$v.$invalid) return;
      try {
        const result = await this.$api.$put("changeEmail", null, {
          password: this.password,
          email: this.email
        });
        console.log(result);
        if (result.error) {
          this.$toast.global.appError({
            message: this.$t("errors." + result.errorCode),
          });
          this.$emit("error");
        }
        if (result.ok) {
          this.$toast.global.appSuccess({
            message: this.$t("changeEmail.success"),
          });
          this.$emit("success");
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