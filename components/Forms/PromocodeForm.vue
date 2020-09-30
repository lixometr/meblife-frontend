<template>
  <form class="promocode-form" action="#" @submit.prevent="onSubmit">
    <AuthInput v-model="promo" :error="promoError" :label="$t('promocode.input')" />
    <button
      type="submit"
      class="btn btn-green btn-md w-100 mt-3 font-bold"
      :class="{ disabled: promo.length <= 0 }"
    >
      {{ $t("promocode.btn") }}
    </button>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import svgError from "@/assets/icons/error.svg";
export default {
  data() {
    return {
      promo: "",
      isSubmited: false,
    };
  },
  components: {
    svgError,
  },
  mixins: [validationMixin],
  validations: {
    promo: {
      required,
    },
  },
  computed: {
    promoError() {
      if (!this.isSubmited || !this.$v.promo.$error) return;
      if (!this.$v.promo.required) {
        return this.$t("formErrors.required");
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
        const result = await this.$api.$post(
          "promocodeCheck",
          null,
          {promocode: this.promo}
        );
        if (result.error) {
          this.$toast.global.appError({
            message: this.$t(`errors.${result.errorCode}`),
          });
        }
        if (result.exists) {
          this.$emit("success", result);
        } else {
          this.$toast.global.appError({
            message: this.$t("promocode.error"),
          });
        }
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss">
.promocode-form {
  .auth-input {
    &__input {
      background: $white;
    }
  }
  .btn {
    &.disabled {
      background: $grey;
      color: $black;
      cursor: default;
      &:hover {
        background: $grey;
        color: $black;

      }
    }
  }
}
</style>