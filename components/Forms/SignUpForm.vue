<template>
  <form action="#" @submit.prevent="onSubmit">
    <div class="mb-2">
      <AuthInput
        type="text"
        :label="$t('signUpPage.inputName')"
        v-model="name"
        :error="nameError"
      />
    </div>
    <div class="mb-2">
      <AuthInput
        type="email"
        :label="$t('signUpPage.inputEmail')"
        v-model="email"
        :error="emailError"
      />
    </div>
    <div>
      <AuthInput
        type="password"
        :label="$t('signUpPage.inputPassword')"
        v-model="password"
        :error="passwordError"
      />
    </div>

    <button type="submit" class="btn btn-green btn-md w-100 mt-3">
      <b>{{ $t("signup") }}</b>
    </button>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email, minLength } from "vuelidate/lib/validators";
import svgError from "@/assets/icons/error.svg";
export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      policyAgree: false,

      isSubmited: false,
    };
  },
  components: {
    svgError,
  },
  mixins: [validationMixin],
  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(this.$store.getters.passwordLength),
      },
      name: {
        required,
      },
    };
  },
  computed: {
    nameError() {
      if (!this.isSubmited || !this.$v.name.$error) return;
      if (!this.$v.name.required) {
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
    passwordError() {
      if (!this.isSubmited || !this.$v.password.$error) return;
      if (!this.$v.password.required) {
        return this.$t("formErrors.required");
      }
      if (!this.$v.password.minLength) {
        return this.$t("formErrors.passwordMinLength").replace('{{length}}',this.$store.getters.passwordLength);
      }
    },
  },
  methods: {
    async onSubmit() {
      this.$v.$touch();
      this.isSubmited = true;
      if (this.$v.$invalid) {
        return;
      }
      try {
        const result = await this.$store.dispatch("user/signup", {
          email: this.email,
          password: this.password,
          name: this.name,
        });
        if (result.error) {
          this.$toast.global.appError({
            message: this.$t(`errors.${result.errorCode}`),
          });
        }
        if(result.ok) {
          this.$emit('success')
         
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