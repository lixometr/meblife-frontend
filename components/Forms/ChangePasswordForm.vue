<template>
  <form action="#" @submit.prevent="onSubmit">
    <AuthInput
      type="password"
      :label="$t('changePassword.inputPassword')"
      class="mb-4"
      :error="passwordError"
      v-model="password"
    />
    {{ passwordError }}
    <AuthInput
      type="password"
      :label="$t('changePassword.inputPasswordNew')"
      class="mb-4"
      :error="newPasswordError"
      v-model="newPassword"
    />
    <AuthInput
      type="password"
      :label="$t('changePassword.inputPasswordOld')"
      class="mb-4"
      :error="newPasswordRepeatError"
      v-model="newPasswordRepeat"
    />
    <button type="submit" class="btn btn-black btn-md w-100 font-bold">
      {{ $t("changePassword.btn") }}
    </button>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
const { required, minLength, sameAs } = require("vuelidate/lib/validators");
export default {
  mixins: [validationMixin],
  validations() {
    return {
      password: {
        required,
      },
      newPassword: {
        required,
        minLength: minLength(this.$store.getters.passwordLength),
      },
      newPasswordRepeat: {
        required,
        sameAsPassword: sameAs("newPassword"),
      },
    };
  },
  data() {
    return {
      isSubmited: false,
      password: "",
      newPassword: "",
      newPasswordRepeat: "",
    };
  },
  computed: {
    passwordError() {
      if (!this.isSubmited || !this.$v.password.$error) return;
      if (!this.$v.password.required) {
        return this.$t("formErrors.required");
      }
    },
    newPasswordError() {
      if (!this.isSubmited || !this.$v.newPassword.$error) return;
      if (!this.$v.newPassword.required) {
        return this.$t("formErrors.required");
      }
      if (!this.$v.newPassword.minLength) {
        return this.$t("formErrors.passwordMinLength").replace(
          "{{length}}",
          this.$store.getters.passwordLength
        );
      }
    },
    newPasswordRepeatError() {
      if (!this.isSubmited || !this.$v.newPasswordRepeat.$error) return;
      if (!this.$v.newPasswordRepeat.required) {
        return this.$t("formErrors.required");
      }
      if (!this.$v.newPasswordRepeat.sameAsPassword) {
        return this.$t("formErrors.passwordNotEquals");
      }
    },
  },
  methods: {
    async onSubmit() {
      this.isSubmited = true;
      this.$v.$touch();
      if (this.$v.$invalid) return;
      try {
        const result = await this.$api.$put("changePassword", null, {
          password: this.password,
          newPassword: this.newPassword,
          newPasswordRepeat: this.newPasswordRepeat,
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
            message: this.$t('changePassword.success'),
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